"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const POSTER = "/video/nexis-showcase-poster.jpg";
const SUMMARY =
  "A 25-second loop through the real app: Spotlight, the AI agent, the editor, Documents, Atlas and SVG Studio, returning to the welcome screen.";

/**
 * The looping product tour that replaced the interactive terminal demo.
 *
 * The <video> is only mounted once the section is near the viewport, plays only
 * while it is on screen and the tab is visible, and under reduced motion the
 * poster stays up until the visitor presses play.
 */
export function ShowcaseLoop() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [requested, setRequested] = useState(false);

  // Mount the video when the section comes within reach.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = near && !reduce;
  const showVideo = autoplay || requested;

  // Pause when scrolled away or the tab is hidden; resume when back.
  useEffect(() => {
    const video = videoRef.current;
    const el = sectionRef.current;
    if (!showVideo || !video || !el) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [showVideo]);

  return (
    <section ref={sectionRef} id="tour" className="features-stage border-b border-white/10 text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <motion.p {...fadeUp(0)} className="caption-label text-brand">In motion</motion.p>
        <motion.h2 {...fadeUp(0.05)} className="feature-heading mt-3">
          One window,<br />
          <span>every job.</span>
        </motion.h2>

        <div className="gallery-window mt-10">
          <div className="gallery-toolbar" aria-hidden="true"><span /><span /><span /><p>NEXIS / TOUR</p></div>
          <div className="relative aspect-[16/10] w-full bg-[#0c1118]">
            {showVideo ? (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                poster={POSTER}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-label={SUMMARY}
              >
                <source src="/video/nexis-showcase.webm" type="video/webm" />
                <source src="/video/nexis-showcase.mp4" type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- static export serves the poster as-is
              <img src={POSTER} alt={SUMMARY} className="absolute inset-0 h-full w-full object-cover" />
            )}
            {reduce && !requested && (
              <button
                type="button"
                onClick={() => setRequested(true)}
                className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black/75"
                aria-label="Play the Nexis tour"
              >
                <Play className="size-6 translate-x-0.5" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm text-white/60">
          {SUMMARY}{" "}
          <a
            href="https://github.com/rwetz/nexis-showcase-video"
            target="_blank"
            rel="noreferrer"
            className="text-white/80 underline underline-offset-4 hover:text-white"
          >
            Source on GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
