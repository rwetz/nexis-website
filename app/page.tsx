import { Nav } from "@/components/nexis/nav";
import { Hero } from "@/components/nexis/hero";
import { FeaturesGrid } from "@/components/nexis/features-grid";
import { ShortcutsPanels } from "@/components/nexis/shortcuts-panels";
import { ScreenshotShowcase } from "@/components/nexis/screenshot-showcase";
import { ShowcaseLoop } from "@/components/nexis/showcase-loop";
import { CTA } from "@/components/nexis/cta";
import { Footer } from "@/components/nexis/footer";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <FeaturesGrid />
        <ShortcutsPanels />
        <ScreenshotShowcase />
        <ShowcaseLoop />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
