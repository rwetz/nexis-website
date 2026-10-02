"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SCREENSHOTS } from "@/lib/content";
import { SCREENSHOT_IMAGES } from "@/components/nexis/screenshot-images";
import { fadeUp } from "@/lib/motion";
import { Tilt } from "@/components/nexis/react-bits/tilt";

export function ScreenshotShowcase() {
  const [active, setActive] = useState(0);
  const shot = SCREENSHOTS[active];
  const image = SCREENSHOT_IMAGES[shot.file];

  function step(direction: number) {
    setActive((current) => (current + direction + SCREENSHOTS.length) % SCREENSHOTS.length);
  }

  return (
    <section id="showcase" className="showcase-stage border-b border-hairline">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.p {...fadeUp(0)} className="caption-label text-brand">Inside Nexis</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="feature-heading mt-3 text-ink">A workspace<br /><span>worth opening.</span></motion.h2>
            <motion.p {...fadeUp(0.1)} className="mt-5 max-w-xl text-body">Real screens from the editor, agent, terminal, and the tools around them.</motion.p>
          </div>
          <div className="flex items-center gap-2" aria-label="Screenshot controls">
            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="gallery-arrow"><ArrowLeft className="size-5" /></button>
            <span className="min-w-14 text-center font-mono text-sm text-ink-muted">{String(active + 1).padStart(2, "0")} / {String(SCREENSHOTS.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="gallery-arrow"><ArrowRight className="size-5" /></button>
          </div>
        </div>

        <Tilt className="mt-10">
        <div className="gallery-window">
          <div className="gallery-toolbar" aria-hidden="true"><span /><span /><span /><p>NEXIS / {shot.label.toUpperCase()}</p></div>
          <div className="gallery-image-wrap">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={shot.file} initial={{ opacity: 0, scale: 1.015 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .99 }} transition={{ duration: .3, ease: "easeOut" }} className="gallery-image">
                <Image src={image} alt={`Nexis ${shot.label} screenshot`} placeholder="blur" sizes="(max-width: 768px) 100vw, 1160px" className="h-full w-full object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </Tilt>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold tracking-tight text-ink">{shot.label}</h3>
          <p className="max-w-2xl text-sm text-body">{shot.caption}</p>
        </div>

        <div className="gallery-selector mt-7" role="group" aria-label="Choose a screenshot">
          {SCREENSHOTS.map((item, index) => (
            <button key={item.file} type="button" onClick={() => setActive(index)} aria-pressed={index === active} className={`gallery-tab ${index === active ? "gallery-tab-active" : ""}`}>
              <span className="gallery-tab-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
