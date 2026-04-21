import { NextRequest } from "next/server";
import archiver from "archiver";
import https from "https";
import { PassThrough } from "stream";

export const runtime = "nodejs";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const imagesParam = searchParams.get("images");

  if (!imagesParam) {
    return new Response("No images provided", { status: 400 });
  }

  const images: string[] = JSON.parse(imagesParam);

  const stream = new PassThrough();
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(stream);

  for (let i = 0; i < images.length; i++) {
    const url = images[i];

    const imageBuffer: Buffer = await new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          const chunks: Buffer[] = [];

          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => resolve(Buffer.concat(chunks)));
          res.on("error", reject);
        })
        .on("error", reject);
    });

    archive.append(imageBuffer, {
      name: `image_${i + 1}.jpg`,
    });
  }

  archive.finalize();

  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=images.zip",
    },
  });
};
