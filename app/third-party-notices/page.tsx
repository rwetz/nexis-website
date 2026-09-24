import type { Metadata } from "next";
import { SitePage } from "@/components/nexis/site-page";

export const metadata: Metadata = { title: "Third-party notices | Nexis" };

export default function ThirdPartyNotices() {
  return <SitePage title="Third-party notices">
    <p>The website source is MIT licensed. The Nexis desktop application is an Apache-2.0 licensed fork of <a href="https://github.com/crynta/terax-ai">Terax</a>. These are separate codebases.</p>
    <h2>React Bits</h2>
    <p>The Magnet and SpotlightCard interactions were adapted from <a href="https://reactbits.dev/">React Bits</a> by David Haz, copyright 2026. They are used under the MIT + Commons Clause License Condition v1.0. The complete notice is in <a href="https://github.com/rwetz/nexis-website/blob/main/THIRD_PARTY_NOTICES.md">THIRD_PARTY_NOTICES.md</a>. The Commons Clause restricts selling, sublicensing, or redistributing the components themselves.</p>
    <h2>Other dependencies</h2>
    <p>Additional library licenses are retained in the dependency packages and their source repositories. The site does not claim ownership of those projects.</p>
  </SitePage>;
}
