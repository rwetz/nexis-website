"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FLUID_FALLBACK_BG } from "@/components/nexis/fluid-fallback";

function Fallback({ className }: { className?: string }) {
  return <div aria-hidden className={className} style={{ background: FLUID_FALLBACK_BG }} />;
}

const FluidCanvas = dynamic(
  () => import("@/components/nexis/fluid-canvas").then((m) => m.FluidCanvas),
  { ssr: false, loading: () => <Fallback className="h-full w-full" /> },
);

/**
 * Shows the static gradient first and only fetches the shader once the card is
 * near the viewport, the browser is idle, and the visitor hasn't asked for
 * reduced motion. Keeps the shader out of the initial bundle.
 */
export function LazyFluidCanvas({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idle = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const go = () => setReady(true);
        if ("requestIdleCallback" in window) idle = window.requestIdleCallback(go, { timeout: 1500 });
        else idle = globalThis.setTimeout(go, 200) as unknown as number;
      },
      { rootMargin: "200px" },
    );
    io.observe(host);
    return () => {
      io.disconnect();
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else globalThis.clearTimeout(idle);
    };
  }, []);

  return (
    <div ref={hostRef} className={className}>
      {ready ? <FluidCanvas className="h-full w-full" /> : <Fallback className="h-full w-full" />}
    </div>
  );
}
