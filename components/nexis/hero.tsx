"use client";

import { motion } from "framer-motion";
import { Download, Star } from "lucide-react";
import { Btn } from "@/components/nexis/ui/btn";
import { LazyFluidCanvas } from "@/components/nexis/fluid-canvas-lazy";
import { GitHubIcon, NexisLogo } from "@/components/nexis/ui/logo";
import { StatsStrip } from "@/components/nexis/stats-strip";
import { SITE, ATTRIBUTION } from "@/lib/content";
import { fadeUp } from "@/lib/motion";
import { useNexisGithub } from "@/lib/use-nexis-github";
import { Magnet } from "@/components/nexis/react-bits/magnet";

export function Hero() {
  const gh = useNexisGithub();

  return (
    <section id="hero" className="hero-stage relative overflow-hidden border-b border-white/10 text-white">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div>
            <motion.p {...fadeUp(0)} className="hero-eyebrow caption-label">
              <span className="hero-live-dot" /> Open source developer environment
            </motion.p>

            <motion.div {...fadeUp(0.05)} className="mt-8 flex items-center gap-5">
              <span className="hero-mark"><NexisLogo size={68} priority /></span>
              <h1 className="hero-title">Nexis<span className="text-brand">.</span></h1>
            </motion.div>

            <motion.h2 {...fadeUp(0.09)} className="hero-statement mt-8 max-w-3xl">
              Your entire workflow.<br /><span>One powerful window.</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.1)}
              className="mt-7 max-w-xl text-lg leading-relaxed text-white/65"
            >
              {SITE.description}
            </motion.p>

            {/* Fork / attribution credit */}
            <motion.div
              {...fadeUp(0.15)}
              className="mt-7 max-w-xl border-l-2 border-brand/70 pl-4 text-sm leading-relaxed text-white/55"
            >
              Forked from{" "}
              <a
                href={ATTRIBUTION.terax}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-white underline decoration-white/40 underline-offset-2 hover:decoration-brand"
              >
                Terax
              </a>{" "}
              by{" "}
              <a
                href={ATTRIBUTION.crynta}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-white underline decoration-white/40 underline-offset-2 hover:decoration-brand"
              >
                crynta
              </a>
              {" — "}extended with additional panels and AI integrations under the{" "}
              <span className="font-medium text-white">{ATTRIBUTION.license}</span> license.{" "}
              <a
                href={ATTRIBUTION.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 underline decoration-white/40 underline-offset-2 hover:text-white"
              >
                YouTube
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnet><Btn variant="dark-primary" href={SITE.releases} target="_blank" rel="noreferrer">
                <Download className="size-4" /> Download {gh.version}
              </Btn></Magnet>
              <Btn variant="dark-ghost" href={SITE.repo} target="_blank" rel="noreferrer">
                <GitHubIcon className="size-4" />
                View on GitHub
                {gh.stars !== null && (
                  <span className="ml-1 inline-flex items-center gap-1 border-l border-white/20 pl-2 text-white/60">
                    <Star className="size-3.5 fill-current" />
                    {gh.stars.toLocaleString()}
                  </span>
                )}
              </Btn>
            </motion.div>
          </div>

          {/* Generative shader card */}
          <motion.div
            {...fadeUp(0.24)}
            className="hero-art relative overflow-hidden rounded-[28px] border border-white/15 bg-[#111927] shadow-[0_40px_100px_-28px_rgba(0,0,0,0.75)]"
          >
            <LazyFluidCanvas className="h-[280px] w-full sm:h-[380px] lg:h-[510px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0c121c]/85 to-transparent px-6 pb-6 pt-20">
              <p className="font-mono text-[11px] uppercase tracking-[.24em] text-white/50">Built to stay in flow</p>
              <p className="mt-1 text-lg text-white">Terminal · Editor · AI · ML</p>
            </div>
            {/* Inner hairline keeps the canvas edge crisp against the card */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div {...fadeUp(0.28)} className="hero-stats mt-16 border-t border-white/15 pt-7">
          <StatsStrip gh={gh} />
        </motion.div>
      </div>
    </section>
  );
}
