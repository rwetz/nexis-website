
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SCREENSHOTS } from "@/lib/content";
import { SCREENSHOT_IMAGES } from "@/components/nexis/screenshot-images";

export function ScreenshotShowcase() {
  const active = 0;
  const shot = SCREENSHOTS[active];
  const image = SCREENSHOT_IMAGES[shot.file];

  return (
    <section id="showcase" className="showcase-stage border-b border-hairline">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="caption-label text-[#b83b00]">Inside Nexis</p>
            <h2 className="feature-heading mt-3 text-ink">A workspace<br /><span>worth opening.</span></h2>
            <p className="mt-5 max-w-xl text-body">Real screens from the editor, agent, terminal, and the tools around them.</p>
          </div>
          <div className="flex items-center gap-2" aria-label="Screenshot controls">
            <button type="button" data-gallery-step="-1" aria-label="Previous screenshot" className="gallery-arrow"><ArrowLeft className="size-5" /></button>
            <span data-gallery-count className="min-w-14 text-center font-mono text-sm text-body">{String(active + 1).padStart(2, "0")} / {String(SCREENSHOTS.length).padStart(2, "0")}</span>
            <button type="button" data-gallery-step="1" aria-label="Next screenshot" className="gallery-arrow"><ArrowRight className="size-5" /></button>
          </div>
        </div>

        <div className="mt-10">
        <div className="gallery-window">
          <div className="gallery-toolbar" aria-hidden="true"><span /><span /><span /><p data-gallery-toolbar>NEXIS / {shot.label.toUpperCase()}</p></div>
          <div className="gallery-image-wrap">

              <div key={shot.file} className="gallery-image">
                <Image src={image} alt={`Nexis ${shot.label} screenshot`} sizes="(max-width: 768px) 100vw, 1160px" className="h-full w-full object-contain" />
              </div>

          </div>
        </div>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
          <h3 data-gallery-title className="text-xl font-semibold tracking-tight text-ink">{shot.label}</h3>
          <p data-gallery-caption className="max-w-2xl text-sm text-body">{shot.caption}</p>
        </div>

        <div className="gallery-selector mt-7" role="group" aria-label="Choose a screenshot">
          {SCREENSHOTS.map((item, index) => (
            <button key={item.file} type="button" data-gallery-index={index} data-gallery-src={SCREENSHOT_IMAGES[item.file].src} data-gallery-label={item.label} data-gallery-caption={item.caption} aria-pressed={index === active} className={`gallery-tab ${index === active ? "gallery-tab-active" : ""}`}>
              <span className="gallery-tab-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
