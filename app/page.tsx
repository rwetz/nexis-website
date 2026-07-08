import { Nav } from "@/components/nexis/nav";
import { Hero } from "@/components/nexis/hero";
import { FeaturesGrid } from "@/components/nexis/features-grid";
import { ShortcutsPanels } from "@/components/nexis/shortcuts-panels";
import { ScreenshotShowcase } from "@/components/nexis/screenshot-showcase";
import { NexisDemo } from "@/components/nexis/demo/nexis-demo";
import { CTA } from "@/components/nexis/cta";
import { Footer } from "@/components/nexis/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturesGrid />
        <ShortcutsPanels />
        <ScreenshotShowcase />
        <NexisDemo />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
