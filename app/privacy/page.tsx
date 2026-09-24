import type { Metadata } from "next";
import { SitePage } from "@/components/nexis/site-page";

export const metadata: Metadata = { title: "Privacy & storage | Nexis" };

export default function Privacy() {
  return <SitePage title="Privacy & storage">
    <p>Last updated September 24, 2026. This notice covers this website, not the Nexis desktop app or GitHub.</p>
    <h2>What this site does</h2>
    <p>This is a static site hosted on GitHub Pages. We do not run advertising or analytics scripts, accept account sign-ins, or set tracking cookies in the site code. GitHub Pages receives normal web requests and may process technical data such as your IP address under its <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">privacy statement</a>.</p>
    <p>The homepage asks the public GitHub API for current Nexis release and repository counts. Your browser connects directly to GitHub for those requests. This site does not save that result in browser storage. Blocking GitHub API requests does not prevent you from reading this site.</p>
    <h2>Cookies and choices</h2>
    <p>The site code uses no cookies or advertising identifiers. There is no optional tracking to consent to, so we do not show a cookie banner. Browser extensions and linked services may behave differently. If this site later adds analytics or other optional storage, we will update this notice and request consent where required.</p>
    <h2>Other sites and contact</h2>
    <p>Links to GitHub and the <a href="https://wiki.nexisdev.org/about/privacy/">Nexis wiki</a> lead to separately hosted services. For a privacy question, <a href="https://github.com/rwetz/nexis-website/issues">open an issue in the website repository</a>. Avoid posting private information in a public issue.</p>
  </SitePage>;
}
