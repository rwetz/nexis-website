"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Btn } from "@/components/nexis/ui/btn";
import { GitHubIcon } from "@/components/nexis/ui/logo";
import { SITE } from "@/lib/content";
import { fadeUp } from "@/lib/motion";

export function CTA() {
  return (
    <section className="dot-grid-dark bg-shell text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-24 text-center sm:px-8 sm:py-28">
        <motion.p {...fadeUp(0)} className="caption-label text-white/45">
          Open source · Apache-2.0
        </motion.p>
        <motion.h2
          {...fadeUp(0.05)}
          className="display-lg mx-auto mt-3 max-w-2xl text-white"
        >
          Star the repo, file issues, or open a pull request.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="mx-auto mt-4 max-w-xl text-white/60"
        >
          Nexis is built in the open. Bring your own API keys, keep your data,
          and help shape where it goes next.
        </motion.p>

        <motion.div
          {...fadeUp(0.15)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Btn variant="dark-primary" href={SITE.repo} target="_blank" rel="noreferrer">
            <GitHubIcon className="size-4" />
            View on GitHub
          </Btn>
          <Btn variant="dark-ghost" href={SITE.releases} target="_blank" rel="noreferrer">
            <Download className="size-4" />
            Download Nexis
          </Btn>
        </motion.div>
      </div>
    </section>
  );
}
