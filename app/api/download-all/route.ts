import { NextRequest } from "next/server";
import archiver from "archiver";
import https from "https";
import { PassThrough } from "stream";

export const runtime = "nodejs";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const imagesParam = searchParams.get("images");
    const zipFilename = searchParams.get("filename");

    if (!imagesParam) {
      return new Response("No images provided", { status: 400 });
    }

    if (!zipFilename) {
      return new Response("No filename provided", { status: 400 });
    }

    const images: {
      url: string;
      filename: string;
    }[] = JSON.parse(imagesParam);

    const stream = new PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(stream);

    for (const image of images) {
      const imageBuffer: Buffer = await new Promise((resolve, reject) => {
        https
          .get(image.url, (res) => {
            const chunks: Buffer[] = [];

            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => resolve(Buffer.concat(chunks)));
            res.on("error", reject);
          })
          .on("error", reject);
      });

      archive.append(imageBuffer, {
        name: image.filename,
      });
    }

    archive.finalize();

    return new Response(stream as any, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipFilename}"`,
      },
    });
  } catch (error: any) {
    console.error("Error creating image ZIP:", error);

    return new Response("Failed to create ZIP", { status: 500 });
  }
};
