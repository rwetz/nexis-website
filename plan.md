# Site plan

## Looping video showcase (replaces the removed terminal demo)

The terminal demo was removed on 2026-10-02. The page now has no moving picture
of the real app. Put a short muted loop where the demo used to be (between the
screenshot showcase and the CTA).

- **Content:** 20–30 s, no audio, cut from the real app: Spotlight opening and
  previewing, an agent run with the orb thinking → speaking, a workbench window
  opening, a Documents edit → PDF export, a theme switch.
- **Source:** `Nexis/brag-output/brag.mp4` is a starting point; a HyperFrames
  composition already exists in `Nexis/brag-output/composition`.
- **Encoding:** H.264 MP4 + VP9/AV1 WebM, 1280 px wide, ≤ 3 MB each, plus a
  poster JPG from the first frame.
- **Markup:** `<video autoplay muted loop playsinline preload="none" poster=…>`
  inside the existing `gallery-window` frame so it matches the showcase.
- **Performance:** mount the `<video>` only when the section is near the viewport
  (same IntersectionObserver pattern as `fluid-canvas-lazy.tsx`); pause when
  off-screen or the tab is hidden.
- **Reduced motion:** show the poster only, with a play button.
- **Accessibility:** `aria-label` describing the loop; captions are not needed
  (no speech), but a visible text summary under it is.

## Screenshots refresh

The showcase images predate 1.29/1.30 (the Spotlight shot likely shows the old
quick-open picker). Missing entirely: Documents, the AI orb, workbench windows,
bottom panel, high contrast.

Automate rather than capture by hand: add a `e2e/specs/screenshots.test.ts` to
Nexis's existing WebdriverIO + tauri-driver suite that opens each surface and
calls `browser.saveScreenshot()`, writing PNGs straight into
`nexis-website/assets/screenshots/`. Rerun after each release.
