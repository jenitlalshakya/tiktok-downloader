import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const generateFilename = (
  username: string,
  videoId: string,
  fileType: "video" | "image" | "thumbnail" = "video",
  index: number = 1
) => {
  username = username || "unknown_user";
  videoId = videoId || "unknown_id";

  if (fileType === "video") return `@${username}_${videoId}.mp4`;
  if (fileType === "image") return `@${username}_${videoId}_img${index}.jpg`;
  if (fileType === "thumbnail") return `@${username}_${videoId}_thumbnail.jpg`;

  return `@${username}_${videoId}`;
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const tiktokUrl = searchParams.get("url");

    if (!tiktokUrl) {
      return NextResponse.json(
        { success: false, message: "Please provide a TikTok URL" },
        { status: 400 }
      );
    }

    if (!tiktokUrl.includes("tiktok.com")) {
      return NextResponse.json(
        { success: false, message: "Invalid TikTok URL" },
        { status: 400 }
      );
    }

    const base_url = process.env.BACKEND_URL;
    const apiUrl = `${base_url}/api/?url=${encodeURIComponent(
      tiktokUrl
    )}`;

    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://www.tiktok.com/",
      },
      timeout: 30000,
    });

    const data = response.data;

    if (!data || data.code !== 0) {
      return NextResponse.json(
        {
          success: false,
          message: data?.msg || "Failed to fetch TikTok data",
        },
        { status: 400 }
      );
    }

    const videoId = data.data?.id || "unknown_id";
    const username =
      data.data?.author?.unique_id ||
      data.data?.author?.nickname ||
      "unknown_user";

    const hasImages =
      Array.isArray(data.data?.images) && data.data.images.length > 0;

    const hasVideo = !!data.data?.play;

    const coverUrl = data.data?.cover || data.data?.video?.cover || "";

    const mediaType = hasImages ? "image" : "video";

    const result = {
      success: true,
      data: {
        id: videoId,

        mediaType,

        author: {
          unique_id: username,
          nickname: data.data?.author?.nickname || username,
        },

        video: hasVideo
          ? {
              play: data.data.play,
              filename: generateFilename(username, videoId, "video"),
              hasAudio: true,
            }
          : null,

        images: hasImages
          ? data.data.images.map((img: any, idx: number) => ({
              url: typeof img === "string" ? img : img.url || img,
              filename: generateFilename(username, videoId, "image", idx + 1),
            }))
          : [],

        cover: coverUrl
          ? {
              url: coverUrl,
              filename: generateFilename(username, videoId, "thumbnail"),
            }
          : null,
      },
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching TikTok data:", error.message);

    if (error.response) {
      return NextResponse.json(
        { success: false, message: "Tikwm API unavailable" },
        { status: error.response.status }
      );
    }

    if (error.code === "ECONNABORTED") {
      return NextResponse.json(
        { success: false, message: "Request timeout" },
        { status: 408 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
};