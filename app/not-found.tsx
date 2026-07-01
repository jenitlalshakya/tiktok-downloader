"use client";

import Link from "next/link";
import { HiHome } from "react-icons/hi2";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="wrapper flex min-h-screen flex-col">
      <main className="container flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="select-none text-8xl font-extrabold tracking-tight">
          <span className="text-[var(--accent)]">4</span>
          <span className="text-[var(--accent-2)]">0</span>
          <span className="text-[var(--accent)]">4</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Page Not Found
        </h1>

        <p className="mt-3 max-w-md text-[15px] leading-7 text-[var(--muted)]">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Return to the TikTok Downloader to continue downloading videos and
          photo posts.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 text-base font-semibold text-white shadow-[0_8px_24px_rgba(255,0,80,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e60046] hover:shadow-[0_12px_32px_rgba(255,0,80,0.40)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:translate-y-0 active:scale-[0.98]"
        >
          <HiHome className="h-5 w-5" aria-hidden />
          Go to Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
