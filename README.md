# 🎵 TikTok Media Downloader (Next.js)

A modern, high-performance full-stack TikTok downloader built with **Next.js**. Download videos (no watermark), image slides, and audio (MP3) effortlessly by pasting a link.

This project represents a **complete migration** from a decoupled backend/frontend architecture to a unified **Next.js Fullstack application**, optimized for performance, SEO, and seamless deployment.

---

## 🚀 Live Demo
[View Live Project](https://tiktok-media-downloader.vercel.app)

---

## 📌 Project Migration

This application was originally built using a separate backend service. To improve developer experience and site performance, it was migrated to a **Next.js App Router architecture**.

### Key Improvements:
* **Unified Repo:** Frontend UI and Backend API routes (`/app/api`) live in one place.
* **Stream-based Handling:** Improved file downloading using Node.js streams.
* **Serverless Optimization:** Leverages Vercel Serverless Functions for cost-effective scaling.
* **Enhanced SEO:** Dynamic OpenGraph support and better metadata handling.

---

## ✨ Features

* 🎬 **No-Watermark Videos:** Download TikTok videos in high quality.
* 🖼️ **Image Slides:** Support for downloading TikTok image-based posts.
* 🎧 **Audio Extraction:** Convert and download audio in MP3 format.
* ⚡ **Fast Streaming:** Direct file streaming to bypass memory bottlenecks.
* 📋 **Smart Clipboard:** Quick-paste link support for mobile and desktop.
* 📱 **Responsive Design:** Optimized for all screen sizes.
* 🚀 **Edge Ready:** Fully optimized for deployment on Vercel.

---

## 🛠 Tech Stack

| Feature | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router) |
| **Frontend** | React, TypeScript |
| **Backend** | Node.js (Next.js API Routes) |
| **Infrastructure** | Vercel Serverless Functions |
| **Processing** | Streams API (for efficient downloads) |
| **Styling** | Custom CSS / Tailwind |

---

## 📁 Project Structure

```text
app/
├── api/
│   ├── download/     # Fetches TikTok media data
│   ├── download-all/ # ZIP download handler
│   └── proxy/        # File streaming proxy to bypass CORS
├── page.tsx          # Main application UI
├── layout.tsx        # SEO & Global Metadata
components/
└── Footer.tsx        # Reusable UI components
public/
├── icon.png          # Favicon assets
└── og-image.png      # Social sharing preview image
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in your root directory:

```env
# Control search engine indexing (false for dev, true for prod)
NEXT_PUBLIC_INDEX=false
```

---

## 🧪 Local Development

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/your-username/tiktok-media-downloader.git](https://github.com/your-username/tiktok-media-downloader.git)
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Run the development server:**
   ```bash
   pnpm dev
   ```
4. **Build for production:**
   ```bash
   pnpm build
   ```

---

## 🚀 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Add your Environment Variables.
4. Click **Deploy**. Vercel will automatically detect the Next.js configuration.

---

## ⚠️ Notes & Limitations

* **Third-Party APIs:** This project relies on external endpoints to fetch TikTok metadata.
* **Streaming:** Large files are streamed directly to the user to avoid Vercel's execution memory limits.
* **ZIP Limitations:** The "Download All" feature may be subject to serverless timeout limits for very large albums.
* **Usage:** This tool is for educational purposes. Please respect TikTok's terms of service and content creators' rights.

---

## 📈 SEO Optimization

* **OpenGraph:** Dynamic meta tags for rich social media sharing.
* **Twitter Cards:** Fully compatible with Twitter/X link previews.
* **Indexing Control:** Environment-based `robots.txt` control via `NEXT_PUBLIC_INDEX`.

---

## 👨‍💻 Author
**Jenit Lal Shakya**

## 📜 License
This project is for educational purposes only. All TikTok content and branding belong to ByteDance Ltd.
```