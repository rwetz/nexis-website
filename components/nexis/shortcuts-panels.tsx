"use client";

import { motion } from "framer-motion";
import { PANELS, SHORTCUTS } from "@/lib/content";
import { fadeUp, scaleIn, slideInLeft, STAGGER } from "@/lib/motion";

export function ShortcutsPanels() {
  return (
    <section
      id="shortcuts"
      className="dot-grid-dark border-b border-black/40 bg-shell text-white"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-5 py-20 sm:px-8 sm:py-[80px] lg:grid-cols-2 lg:gap-20">
        {/* Keyboard shortcuts */}
        <div>
          <motion.p {...fadeUp(0)} className="caption-label text-white/45">
            Muscle memory
          </motion.p>
          <motion.h2 {...fadeUp(0.05)} className="display-lg mt-3 text-white">
            Keyboard-first.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-4 max-w-md text-white/60">
            Every core action is a keystroke away. Remap any of them from a
            searchable shortcuts panel.
          </motion.p>

          <ul className="mt-8 divide-y divide-white/10">
            {SHORTCUTS.map((s, i) => (
              <motion.li
                key={s.action}
                {...slideInLeft(i * STAGGER.shortcut)}
                className="flex items-center justify-between py-3"
              >
                <span className="text-[15px] text-white/85">{s.action}</span>
                <span className="flex items-center gap-1">
                  {s.keys.map((k) => (
                    <kbd
                      key={k}
                      className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-xs text-white/80"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Sidebar panels */}
        <div>
          <motion.p {...fadeUp(0)} className="caption-label text-white/45">
            Everything a click away
          </motion.p>
          <motion.h2 {...fadeUp(0.05)} className="display-lg mt-3 text-white">
            {PANELS.length} sidebar panels.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-4 max-w-md text-white/60">
            Dock any tool beside your workspace — from source control and tests
            to an AI agent queue and prompt templates.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-2">
            {PANELS.map((p, i) => (
              <motion.span
                key={p}
                {...scaleIn(i * STAGGER.pill)}
                className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-sm text-white/75 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
