"use client";

import { motion } from "framer-motion";
import { Download, Star } from "lucide-react";
import { Btn } from "@/components/nexis/ui/btn";
import { FluidCanvas } from "@/components/nexis/fluid-canvas";
import { GitHubIcon, NexisLogo } from "@/components/nexis/ui/logo";
import { StatsStrip } from "@/components/nexis/stats-strip";
import { SITE, ATTRIBUTION } from "@/lib/content";
import { fadeUp } from "@/lib/motion";
import { useNexisGithub } from "@/lib/use-nexis-github";

export function Hero() {
  const gh = useNexisGithub();

  return (
    <section id="hero" className="dot-grid relative overflow-hidden border-b border-hairline">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <div>
            <motion.p {...fadeUp(0)} className="caption-label text-brand">
              Project
            </motion.p>

            <motion.div {...fadeUp(0.05)} className="mt-6 flex items-center gap-4">
              <NexisLogo size={60} />
              <h1 className="display-mega text-ink">Nexis</h1>
            </motion.div>

            <motion.p
              {...fadeUp(0.1)}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-body"
            >
              {SITE.description}
            </motion.p>

            {/* Fork / attribution credit */}
            <motion.div
              {...fadeUp(0.15)}
              className="mt-7 max-w-2xl rounded-[12px] border border-hairline bg-surface-card/70 px-4 py-3 text-sm leading-relaxed text-body"
            >
              Forked from{" "}
              <a
                href={ATTRIBUTION.terax}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline decoration-hairline-strong underline-offset-2 hover:decoration-brand"
              >
                Terax
              </a>{" "}
              by{" "}
              <a
                href={ATTRIBUTION.crynta}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline decoration-hairline-strong underline-offset-2 hover:decoration-brand"
              >
                crynta
              </a>
              {" — "}extended with additional panels and AI integrations under the{" "}
              <span className="font-medium text-ink">{ATTRIBUTION.license}</span> license.{" "}
              <a
                href={ATTRIBUTION.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-ink-muted underline decoration-hairline-strong underline-offset-2 hover:text-ink"
              >
                YouTube
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.2)} className="mt-8 flex flex-wrap items-center gap-3">
              <Btn variant="secondary" href={SITE.repo} target="_blank" rel="noreferrer">
                <GitHubIcon className="size-4" />
                View on GitHub
                {gh.stars !== null && (
                  <span className="ml-1 inline-flex items-center gap-1 border-l border-hairline-strong pl-2 text-ink-muted">
                    <Star className="size-3.5 fill-current" />
                    {gh.stars.toLocaleString()}
                  </span>
                )}
              </Btn>
              <Btn variant="download" href={SITE.releases} target="_blank" rel="noreferrer">
                <Download className="size-4" />
                Download {gh.version}
              </Btn>
            </motion.div>
          </div>

          {/* Generative shader card */}
          <motion.div
            {...fadeUp(0.24)}
            className="relative overflow-hidden rounded-[20px] border border-hairline bg-surface-card shadow-[0_1px_2px_rgba(38,37,30,0.05),0_12px_32px_-12px_rgba(38,37,30,0.18)]"
          >
            <FluidCanvas className="h-[200px] w-full sm:h-[240px] md:h-[360px] lg:h-[440px]" />
            {/* Inner hairline keeps the canvas edge crisp against the card */}
            <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-black/10" />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div {...fadeUp(0.28)} className="mt-14 border-t border-hairline pt-8">
          <StatsStrip gh={gh} />
        </motion.div>
      </div>
    </section>
  );
}
