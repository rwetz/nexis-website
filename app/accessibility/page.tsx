import type { Metadata } from "next";
import { SitePage } from "@/components/nexis/site-page";

export const metadata: Metadata = { title: "Accessibility | Nexis" };

export default function Accessibility() {
  return <SitePage title="Accessibility">
    <p>Last updated September 24, 2026. We aim to make this site usable with a keyboard, screen reader, zoom, and reduced-motion settings.</p>
    <h2>What is supported</h2>
    <p>Use the skip link to bypass navigation. The menu, feature details, and screenshot gallery use keyboard controls. Decorative motion is reduced when your device requests less motion. Images have descriptive alternative text where they carry information.</p>
    <h2>Report a problem</h2>
    <p>We have not commissioned a formal WCAG conformance audit, so we do not claim full compliance. If something is hard to use, <a href="https://github.com/rwetz/nexis-website/issues">report it in the website repository</a> with the page, browser, and assistive technology you used. Do not include sensitive personal details in a public issue.</p>
  </SitePage>;
}
