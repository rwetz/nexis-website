import { Play } from "lucide-react";
const POSTER = "/video/nexis-showcase-poster.jpg";
const SUMMARY = "A 26-second loop recorded live from the app: the welcome screen, Spotlight, the terminal, the AI agent, Documents and theme switching.";
export function ShowcaseLoop() {
  return (
    <section id="tour" className="features-stage border-b border-white/10 text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <p className="caption-label text-brand">In motion</p>
        <h2 className="feature-heading mt-3">
          One window,<br />
          <span>every job.</span>
        </h2>

        <div className="gallery-window mt-10">
          <div className="gallery-toolbar" aria-hidden="true"><span /><span /><span /><p>NEXIS / TOUR</p></div>
          <div className="relative aspect-[16/10] w-full bg-[#0c1118]">
            {/* eslint-disable-next-line @next/next/no-img-element -- lazy static video poster */}
            <img loading="lazy" src={POSTER} alt={SUMMARY} data-tour-poster className="absolute inset-0 h-full w-full object-cover" />
            <video data-tour-video className="absolute inset-0 h-full w-full object-cover" data-poster={POSTER}
              muted loop playsInline preload="none" aria-label={SUMMARY}>
              <source data-src="/video/nexis-showcase.webm" type="video/webm" />
              <source data-src="/video/nexis-showcase.mp4" type="video/mp4" />
            </video>
            <button type="button" data-tour-play className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-black/75" aria-label="Play the Nexis tour">
              <Play className="size-6 translate-x-0.5" />
            </button>
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
