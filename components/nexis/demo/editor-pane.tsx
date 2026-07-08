"use client";

import { ChevronRight } from "lucide-react";
import { EDITOR_CONTENT, N } from "./demo-data";
import { highlightLine } from "./syntax";

export function EditorPane({ name, path }: { name: string; path?: string }) {
  const file = EDITOR_CONTENT[name];
  const segs = path ? path.split("/").slice(1) : [name];

  return (
    <div className="flex h-full flex-col" style={{ background: N.bg }}>
      {/* breadcrumb */}
      <div
        className="flex shrink-0 items-center gap-1 px-3 py-1.5 text-[12px]"
        style={{ color: N.mutedFg, borderBottom: `1px solid ${N.border}` }}
      >
        {segs.map((s, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3 opacity-60" />}
            <span style={{ color: i === segs.length - 1 ? N.primary : undefined }}>
              {s}
            </span>
          </span>
        ))}
      </div>

      {file ? (
        <div className="nx-scroll flex-1 overflow-auto py-2 font-mono text-[13px] leading-[1.55]">
          {file.code.replace(/\n$/, "").split("\n").map((line, i) => (
            <div key={i} className="flex px-1 hover:bg-white/[0.03]">
              <span
                className="w-10 shrink-0 select-none pr-3 text-right"
                style={{ color: N.mutedFg, opacity: 0.6 }}
              >
                {i + 1}
              </span>
              <span className="whitespace-pre" style={{ color: N.fg }}>
                {line.length ? highlightLine(line, file.lang) : " "}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="grid flex-1 place-items-center font-mono text-sm"
          style={{ color: N.mutedFg }}
        >
          {name}
        </div>
      )}
    </div>
  );
}
