"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (loading) return;
    
    if (!url) {
      setError("Please enter a TikTok URL");
      return;
    }

    setError("");
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.message);

      setData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const download = (fileUrl: string, filename: string) => {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(
      fileUrl
    )}&filename=${encodeURIComponent(filename)}`;

    const a = document.createElement("a");
    a.href = proxyUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      alert("Clipboard access denied!");
    }
  };

  const isImagePost = data?.mediaType === "image";
  const isVideoPost = data?.mediaType === "video";

  return (
    <div className="wrapper">
      <div className="container">
        <h1>
          <span>TikTok</span> Video & Image Downloader
        </h1>

        <p>Paste TikTok video or photo link below</p>

        <div className="input-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste TikTok link here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchData();
            }}
          />

          <button id="pasteBtn" onClick={pasteFromClipboard}>
            📋 Paste
          </button>
        </div>

        <button id="fetchBtn" onClick={fetchData} disabled={loading}>
          {loading ? "Fetching..." : "Download"}
        </button>

        {error && <p className="error">{error}</p>}

        <div id="results" className="results">
          {loading && !data && (
            <div className="skeleton-container">
              <p className="loading-text">Fetching Data...</p>
              <div className="skeleton-loading"></div>
              <div className="skeleton-loading"></div>
              <div className="skeleton-loading"></div>
            </div>
          )}
          
          {data && (
            <>
              <div className="note">
                Preview and download your TikTok content below.
              </div>

              {isVideoPost && data.video?.play && (
                <div className="media-block">
                  <video
                    src={data.video.play}
                    controls
                    className="preview-video"
                  />

                  <button
                    className="download-btn"
                    onClick={() =>
                      download(data.video.play, data.video.filename)
                    }
                  >
                    Download Video
                  </button>
                </div>
              )}

              {isImagePost && data.images?.length > 0 && (
                <div className="image-section">

                  <h3>Images</h3>

                  <div className="image-scroll-container">
                    {data.images.map((img: any, i: number) => (
                      <div key={i} className="image-wrapper">

                        <img
                          src={img.url}
                          className="preview-img"
                          onClick={() => window.open(img.url, "_blank")}
                        />

                        <button
                          className="download-btn"
                          onClick={() => download(img.url, img.filename)}
                        >
                          Download Image {i + 1}
                        </button>

                      </div>
                    ))}
                  </div>

                  <button
                    className="download-btn"
                    onClick={() => {
                      const urls = data.images.map((img: any) => img.url);

                      const zipUrl = `/api/download-all?images=${encodeURIComponent(
                        JSON.stringify(urls)
                      )}`;

                      window.location.href = zipUrl;
                    }}
                  >
                    Download All Images (ZIP)
                  </button>

                </div>
              )}

              {isImagePost && data.video?.play && (
                <div className="media-block">
                  <h3>Audio</h3>

                  <audio controls style={{ width: "100%", marginTop: 10 }}>
                    <source src={data.video.play} />
                  </audio>

                  <button
                    className="download-btn"
                    onClick={() =>
                      download(
                        data.video.play,
                        data.video.filename.replace(".mp4", ".mp3")
                      )
                    }
                  >
                    Download MP3 / Audio
                  </button>
                </div>
              )}

              {data.cover?.url && (
                <div className="media-block">

                  <img
                    src={data.cover.url}
                    className="preview-img"
                    style={{ width: 200, marginTop: 10 }}
                  />

                  <button
                    className="download-btn"
                    onClick={() =>
                      download(data.cover.url, data.cover.filename)
                    }
                  >
                    Download Thumbnail
                  </button>

                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
