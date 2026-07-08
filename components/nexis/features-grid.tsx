"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/content";
import { fadeUp, STAGGER } from "@/lib/motion";

export function FeaturesGrid() {
  return (
    <section id="features" className="dot-grid border-b border-hairline">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[80px]">
        <motion.p {...fadeUp(0)} className="caption-label text-ink-muted">
          Capabilities
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="display-lg mt-3 text-ink">
          Everything in one window.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-4 max-w-xl text-body">
          A terminal, editor, AI agent, debugger, and more — a full developer
          environment that never makes you leave the app.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                {...fadeUp(i * STAGGER.card)}
                className="group rounded-[12px] border border-hairline bg-surface-card p-6 transition-colors hover:border-hairline-strong"
              >
                <span
                  className="grid size-10 place-items-center rounded-[10px]"
                  style={{ backgroundColor: `${f.color}1f` }}
                >
                  <Icon className="size-5" style={{ color: f.color }} />
                </span>
                <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-ink">
                  {f.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-snug text-body">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: f.color }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
