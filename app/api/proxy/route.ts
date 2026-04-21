import { NextRequest } from "next/server";
import https from "https";
import { pipeline } from "stream";
import { Readable } from "stream";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const fileUrl = searchParams.get("url");
  const filename = searchParams.get("filename") || "download";

  if (!fileUrl) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing URL" }),
      { status: 400 }
    );
  }

  try {
    new URL(fileUrl);
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid URL" }),
      { status: 400 }
    );
  }

  return new Promise<Response>((resolve) => {
    https
      .get(fileUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          referer: "https://www.tiktok.com/",
          origin: "https://www.tiktok.com",
        },
      })
      .on("response", (fileStream) => {
        const headers = new Headers();

        headers.set(
          "Content-Type",
          fileStream.headers["content-type"] || "application/octet-stream"
        );

        headers.set(
          "Content-Disposition",
          `attachment; filename="${filename}"`
        );

        const readable = Readable.from(fileStream as any);

        resolve(
          new Response(readable as any, {
            headers,
          })
        );
      })
      .on("error", () => {
        resolve(
          new Response(
            JSON.stringify({ success: false, message: "Download failed" }),
            { status: 500 }
          )
        );
      });
  });
};
