"use client";

import { motion } from "framer-motion";
import { SCREENSHOTS } from "@/lib/content";
import { fadeUp, STAGGER } from "@/lib/motion";
import { ScreenshotFrame } from "@/components/nexis/screenshot-frame";

export function ScreenshotShowcase() {
  return (
    <section id="showcase" className="dot-grid border-b border-hairline">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[80px]">
        <motion.p {...fadeUp(0)} className="caption-label text-ink-muted">
          A look inside
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="display-lg mt-3 text-ink">
          Built for real workflows.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-4 max-w-xl text-body">
          From the welcome screen to the AI agent, every surface is designed to
          keep you in flow.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {SCREENSHOTS.map((shot, i) => (
            <motion.div key={shot.file} {...fadeUp((i % 2) * STAGGER.card)}>
              <ScreenshotFrame shot={shot} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
