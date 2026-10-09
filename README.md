# Nexis marketing site

The single-page marketing site for **[Nexis](https://github.com/rwetz/Nexis)**, an
open-source, AI-native terminal & developer environment (Tauri + React, under
10 MB, zero telemetry).

Live at **[nexisdev.org](https://nexisdev.org)**.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router): static export
- **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** + **[shadcn/ui](https://ui.shadcn.com)**
- **[framer-motion](https://www.framer.com/motion/)** for scroll/stagger animation
- **[lucide-react](https://lucide.dev)** icons
- **Inter** + **JetBrains Mono** (via `next/font`), the open substitute for the
  licensed CursorGothic display face

The visual language follows a Cursor-style design system: a warm cream canvas
(`#f7f7f4`), warm-ink text (`#26251e`), a single scarce orange CTA (`#f54e00`),
hairline-only depth, and an 80px section rhythm.

## What's on the page

| Section | Notes |
|---|---|
| Nav | Sticky, signature mark + Nexis wordmark, anchor links |
| Hero | Live GitHub stats (stars + latest release, cached in `sessionStorage`) |
| Features | 10 capability cards |
| Shortcuts + Panels | Dark band: 10 keyboard shortcuts, 23 sidebar panels |
| Showcase | 8 captioned product screenshots |
| Interactive demo | A working fake-IDE: real mini-shell (`help`, `ls`, `git status`, `nexis -v`, history), syntax-highlighted editor, clickable file tree/tabs, seeded AI panel |
| CTA + Footer | Repo links + Apache-2.0 attribution to upstream Terax |

## Local development

Requires **Node 20+**.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # static export -> ./out
npm run start    # serve a production build (Node host only, not Pages)
npm run lint
```

> Using `nvm` + fish? Make Node visible once with
> `fish_add_path ~/.nvm/versions/node/v20.20.2/bin`.

## Deployment (GitHub Pages)

The site is a **static export** (`output: 'export'` in
[`next.config.ts`](next.config.ts), images `unoptimized`) and deploys via GitHub
Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. **Settings → Pages → Build and deployment → Source: _GitHub Actions_.**
2. Every push to `main` builds `./out` and publishes it.

### Custom domain

[`public/CNAME`](public/CNAME) pins the domain to `nexisdev.org`. Point DNS at
GitHub Pages:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

(For a `www` subdomain instead, use a `CNAME` record → `rwetz.github.io`.) Enable
**Enforce HTTPS** in Settings → Pages once the certificate is issued.

## Assets

Real screenshots + signature live in [`assets/`](assets) and are wired through
`components/nexis/screenshot-images.ts`. Swap any file in place to update the
showcase; filenames are already mapped.

## License

Original site code is [MIT](LICENSE). The adapted React Bits Magnet and
SpotlightCard components retain their separate MIT + Commons Clause terms in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Nexis itself is Apache-2.0,
forked from [Terax](https://github.com/crynta/terax-ai) by crynta.

## Static production preview and performance

`npm run build` renders the site with Next.js and finalizes the static export.
The published HTML uses the small `public/site.js` enhancement script for the
menu, screenshot gallery, and viewport-aware video. It does not load React
hydration or Next's client router. Links are ordinary document/anchor links.
The export finalizer fails if a project client component is added, so a future
interactive feature cannot silently lose its behavior. Test the production
export, not only the Next development server, when changing these interactions.

`npm run preview` serves `out/` at `http://127.0.0.1:4173` with gzip and cache
headers. The preview server represents compressed static hosting; it is not
production deployment verification. Lighthouse uses its default mobile
simulation, with a separate `--preset=desktop` run for desktop.

Images are committed derivatives of the real app captures. Regenerate with
`node scripts/optimize-images.mjs` (Sharp is installed by Next). Fonts are renamed
Latin subsets of Inter and JetBrains Mono, covering weights 400-600. Original
WOFF2 files and OFL licenses are in `assets/fonts/`. Regenerate with
`python scripts/subset-fonts.py` after installing `fonttools` and `brotli`.
Characters outside the subset use the browser's font fallback. Fonts use optional
loading to avoid a late font swap on slow connections.
