import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "brand" // Cursor Orange — the one scarce CTA color
  | "secondary" // white pill + hairline
  | "download" // ink-on-cream
  | "dark-primary" // cream pill on a dark band
  | "dark-ghost"; // outlined, for dark bands

type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[8px] text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand/50 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-on-brand hover:bg-brand-active",
  secondary:
    "bg-surface-card text-ink border border-hairline-strong hover:bg-canvas-soft",
  download: "bg-ink text-canvas hover:bg-ink/90",
  "dark-primary": "bg-canvas text-ink hover:bg-white",
  "dark-ghost":
    "border border-white/20 text-white hover:bg-white/10 focus-visible:ring-white/40",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-[18px]",
  lg: "h-11 px-5",
};

type BtnProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Btn({
  variant = "brand",
  size = "md",
  className,
  children,
  ...props
}: BtnProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
