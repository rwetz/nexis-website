"use client";

// Adapted from React Bits Magnet (David Haz, MIT + Commons Clause).
// https://reactbits.dev/animations/magnet
import { useRef, useState, type ReactNode } from "react";

export function Magnet({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function move(event: React.MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setOffset({ x: (event.clientX - rect.left - rect.width / 2) * 0.14, y: (event.clientY - rect.top - rect.height / 2) * 0.14 });
  }

  return (
    <div ref={ref} className={className} onMouseMove={move} onMouseLeave={() => setOffset({ x: 0, y: 0 })}>
      <div style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }} className="magnet-inner">
        {children}
      </div>
    </div>
  );
}
