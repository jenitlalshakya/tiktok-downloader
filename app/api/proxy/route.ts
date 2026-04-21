import { NextRequest } from "next/server";
import { Agent, fetch } from "undici";

export const runtime = "nodejs";

const agent = new Agent({
  keepAliveTimeout: 60000,
  keepAliveMaxTimeout: 60000,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const fileUrl = searchParams.get("url");
  const filename = searchParams.get("filename") || "download.mp4";

  if (!fileUrl) {
    return Response.json(
      { success: false, message: "Missing URL" },
      { status: 400 }
    );
  }

  try {
    new URL(fileUrl);
  } catch {
    return Response.json(
      { success: false, message: "Invalid URL" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(fileUrl, {
      dispatcher: agent,
      headers: {
        "User-Agent": "Mozilla/5.0",
        referer: "https://www.tiktok.com/",
        origin: "https://www.tiktok.com",
        Range: "bytes=0-",
      },
    });

    if (!res.ok || !res.body) {
      return Response.json(
        { success: false, message: "Failed to fetch file" },
        { status: 500 }
      );
    }

    const headers = new Headers();

    headers.set(
      "Content-Type",
      res.headers.get("content-type") || "application/octet-stream"
    );

    headers.set(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    const contentLength = res.headers.get("content-length");
    if (contentLength) headers.set("Content-Length", contentLength);

    headers.set("Accept-Ranges", "bytes");

    return new Response(res.body as unknown as ReadableStream<Uint8Array>, {
      headers,
    });

  } catch {
    return Response.json(
      { success: false, message: "Download failed" },
      { status: 500 }
    );
  }
}
