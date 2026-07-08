import { cn } from "@/lib/utils";

/**
 * Placeholder Nexis app icon.
 * The real asset is `src/assets/logo (1) (1).png` (nexis-site.md §10) — drop it
 * into /public/nexis/logo.png and swap this for <Image> when available.
 * Rendered at 22% border-radius per the original NexisLogo.
 */
export function NexisLogo({
  size = 34,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-grid place-items-center", className)}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "linear-gradient(150deg, #2d3a4f 0%, #1b2232 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
      aria-hidden
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d8e4ef"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 8l4 4-4 4" />
        <path d="M13 16h6" />
      </svg>
    </span>
  );
}

/**
 * GitHub mark — lucide-react dropped its brand icons, so this is inline.
 */
export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}
