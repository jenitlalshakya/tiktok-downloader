import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isProduction = process.env.NEXT_PUBLIC_INDEX === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://tiktok-media-downloader.vercel.app"),

  title: {
    default: "TikTok Video & Image Downloader (No Watermark)",
    template: "%s | TikTok Downloader",
  },

  description:
    "Download TikTok videos and images without watermark for free. Fast, secure, and works on all devices. Paste your TikTok link and download instantly.",

  keywords: [
    "tiktok downloader",
    "download tiktok video",
    "tiktok no watermark",
    "tiktok video downloader",
    "download tiktok images",
    "tiktok mp3 download",
  ],

  authors: [{ name: "Jenit Lal Shakya" }],

  creator: "Jenit Lal Shakya",

  openGraph: {
    title: "TikTok Video & Image Downloader (No Watermark)",
    description:
      "Download TikTok videos & images without watermark instantly. Free, fast and secure.",
    url: "https://tiktok-media-downloader.vercel.app",
    siteName: "TikTok Downloader",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TikTok Downloader Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TikTok Video Downloader (No Watermark)",
    description:
      "Download TikTok videos and images without watermark instantly.",
    images: ["/og-image.png"],
  },

  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
