"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/content";
import { fadeUp, STAGGER } from "@/lib/motion";
import { SpotlightCard } from "@/components/nexis/react-bits/spotlight-card";
import { ChevronDown } from "lucide-react";

export function FeaturesGrid() {
  return (
    <section id="features" className="features-stage border-b border-white/10 text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[80px]">
        <motion.p {...fadeUp(0)} className="caption-label text-brand">
          The workbench
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="feature-heading mt-3">
          Less switching.<br /><span>More building.</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-4 max-w-xl text-white/60">
          A terminal, editor, AI agent, local ML lab, repository map, and SVG
          studio — organized around the work you actually do.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.slice(0, 6).map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                {...fadeUp(i * STAGGER.card)}
                className="group"
              >
                <SpotlightCard className="h-full min-h-[230px] p-6">
                  <span className="grid size-11 place-items-center rounded-[12px] border border-white/10" style={{ backgroundColor: `${f.color}25` }}>
                    <Icon className="size-5" style={{ color: f.color }} />
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-white">{f.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-sm leading-snug text-white/60">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: f.color }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="text-xl font-medium tracking-tight">And everything around the work.</h3>
          <p className="mt-2 max-w-xl text-sm text-white/55">Explore the other tools without wading through another wall of cards.</p>
          <div className="mt-6 grid items-start gap-3 md:grid-cols-2">
            {FEATURES.slice(6).map((feature) => {
              const Icon = feature.icon;
              return (
                <details key={feature.title} className="feature-detail">
                  <summary>
                    <Icon className="size-5 shrink-0" style={{ color: feature.color }} />
                    <span className="flex-1 font-medium">{feature.title}</span>
                    <ChevronDown className="feature-chevron size-4 text-white/45" />
                  </summary>
                  <ul className="space-y-2 px-5 pb-5 pl-12 text-sm text-white/60">
                    {feature.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
