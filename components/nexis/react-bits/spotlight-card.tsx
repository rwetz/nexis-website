"use client";

// Adapted from React Bits SpotlightCard (David Haz, MIT + Commons Clause).
// https://reactbits.dev/components/spotlight-card
import { useRef, useState, type ReactNode } from "react";

export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function move(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  return (
    <div ref={ref} className={`spotlight-card ${className}`} onMouseMove={move} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <div aria-hidden="true" className="spotlight-glow" style={{ opacity: active ? 1 : 0, background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, rgba(255, 112, 50, .19), transparent 72%)` }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
