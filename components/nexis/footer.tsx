import { NexisLogo } from "@/components/nexis/ui/logo";
import { ATTRIBUTION, SITE } from "@/lib/content";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Shortcuts", href: "#shortcuts" },
      { label: "Screenshots", href: "#showcase" },
      { label: "Demo", href: "#demo" },
      { label: "Wiki", href: SITE.wiki },
    ],
  },
  {
    title: "Source",
    links: [
      { label: "GitHub", href: SITE.repo },
      { label: "Releases", href: `${SITE.repo}/releases` },
      { label: "Issues", href: `${SITE.repo}/issues` },
    ],
  },
  {
    title: "Credits",
    links: [
      { label: "Terax (upstream)", href: ATTRIBUTION.terax },
      { label: "crynta", href: ATTRIBUTION.crynta },
      { label: "YouTube", href: ATTRIBUTION.youtube },
    ],
  },
];

export function Footer() {
  return (
    <footer className="dot-grid border-t border-hairline bg-canvas">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <NexisLogo size={28} />
            <span className="text-[15px] font-semibold tracking-tight text-ink">
              Nexis
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-body">
            Open-source, AI-native terminal &amp; developer environment. Under
            10&nbsp;MB, zero telemetry.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="caption-label text-ink-muted">{col.title}</div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("#") ? undefined : "_blank"}
                    rel={l.href.startsWith("#") ? undefined : "noreferrer"}
                    className="text-sm text-body transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-ink-muted sm:flex-row sm:px-8">
          <span>
            Forked from Terax · Licensed under {ATTRIBUTION.license}
          </span>
          <span>© {SITE.name}</span>
        </div>
      </div>
    </footer>
  );
}
