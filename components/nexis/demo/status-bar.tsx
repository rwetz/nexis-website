"use client";

import { GitBranch, Sparkles } from "lucide-react";
import { AI_MODEL, N } from "./demo-data";

export function StatusBar({ path }: { path: string }) {
  return (
    <div
      className="relative flex h-7 shrink-0 items-center justify-between px-3 text-[11px]"
      style={{ background: N.card, color: N.mutedFg }}
    >
      {/* thin gradient top border */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${N.borderBright}, transparent)`,
        }}
      />

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <GitBranch className="size-3.5" style={{ color: N.blue }} />
          main
        </span>
        <span className="font-mono">{path}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ background: N.green }} />0 errors
        </span>
        <span
          className="flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ background: N.muted, color: N.purple }}
        >
          <Sparkles className="size-3" />
          {AI_MODEL}
        </span>
      </div>
    </div>
  );
}
