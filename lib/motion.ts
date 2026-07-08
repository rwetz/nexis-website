// Shared framer-motion presets (nexis-site.md §12).
// Used as spread props on <motion.*> elements inside client components.

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Standard reveal: fade + rise, plays once when scrolled into view. */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: EASE, delay },
});

/** Shortcut rows slide in from the left. */
export const slideInLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -12 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, ease: EASE, delay },
});

/** Panel pills scale in. */
export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.35, ease: EASE, delay },
});

/** Stagger step helpers so callers stay declarative. */
export const STAGGER = {
  card: 0.08,
  shortcut: 0.05,
  pill: 0.03,
} as const;
