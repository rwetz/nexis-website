import { ArrowUpRight, Download } from "lucide-react";
import { Btn } from "@/components/nexis/ui/btn";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section id="hero" className="hero-stage" aria-labelledby="hero-heading">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow">Open source. Yours to build with.</p>
          <h1 id="hero-heading" className="hero-title">
            Your editor, terminal, and AI. <span>Together.</span>
          </h1>
          <p className="hero-description">
            Build in one open-source workspace. Bring your own API keys or run models locally.
          </p>
          <div className="hero-actions">
            <Btn variant="brand" size="lg" href={SITE.releases} target="_blank" rel="noreferrer" className="hero-download">
              <Download className="size-4" aria-hidden="true" /> Download Nexis
            </Btn>
            <a className="hero-source" href={SITE.repo} target="_blank" rel="noreferrer">
              View source <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <a href="#showcase" className="hero-preview" aria-label="Explore screenshots of Nexis">
          {/* Static export: pre-sized assets replace a runtime image optimizer. */}
          <picture>
            <source media="(max-width: 767px)" type="image/avif" srcSet="/nexis/editor-mobile.avif" />
            <source type="image/avif" srcSet="/nexis/editor-480.avif 480w, /nexis/editor-800.avif 800w, /nexis/editor-1200.avif 1200w" sizes="(min-width: 1280px) 1200px, calc(100vw - 40px)" />
            <img src="/nexis/editor-800.webp" srcSet="/nexis/editor-480.webp 480w, /nexis/editor-800.webp 800w, /nexis/editor-1200.webp 1200w" sizes="(min-width: 1280px) 1200px, calc(100vw - 40px)" width={1600} height={1000}
              alt="Nexis code editor with a TypeScript file, project explorer, terminal tab, and workbench tools."
              loading="eager" fetchPriority="high" />
          </picture>
        </a>
      </div>
    </section>
  );
}
