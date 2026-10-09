import type { ReactNode } from "react";

export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`spotlight-card ${className}`}><div className="relative">{children}</div></div>;
}
