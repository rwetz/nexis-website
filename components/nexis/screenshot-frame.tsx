import Image from "next/image";
import type { Screenshot } from "@/lib/content";
import { SCREENSHOT_IMAGES } from "./screenshot-images";

/**
 * A captioned product screenshot (nexis-site.md §7).
 * Renders the real image (natural aspect, no crop) with an accent-dot label +
 * caption footer, on a white card with a hairline border and 14px radius.
 */
export function ScreenshotFrame({ shot }: { shot: Screenshot }) {
  const img = SCREENSHOT_IMAGES[shot.file];

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#c8ccd2] bg-surface-card">
      <div className="relative border-b border-hairline bg-[#1b2232]">
        {img ? (
          <Image
            src={img}
            alt={`Nexis — ${shot.label}`}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 580px"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div className="aspect-[16/10]" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: shot.accent }}
          />
          <span className="text-[15px] font-semibold text-ink">{shot.label}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-body">{shot.caption}</p>
      </div>
    </div>
  );
}
