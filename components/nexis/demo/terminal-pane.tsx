"use client";

import { useEffect, useRef, useState } from "react";
import { N, PROMPT, runCommand } from "./demo-data";
import { ansiToJsx } from "./syntax";

type Entry = { kind: "cmd" | "out"; text: string };

export function TerminalPane({ version }: { version: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll this pane (not the page) to the bottom on new output/typing.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, input]);

  function submit() {
    const platform =
      typeof navigator !== "undefined" ? navigator.platform : "web";
    const next: Entry[] = [...entries, { kind: "cmd", text: input }];
    const res = runCommand(input, { version, platform });

    if ("clear" in res) {
      setEntries([]);
    } else {
      setEntries([...next, ...res.lines.map((l): Entry => ({ kind: "out", text: l }))]);
    }
    if (input.trim()) setHistory((h) => [...h, input]);
    setHistIdx(null);
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  }

  return (
    <div
      ref={scrollRef}
      className="nx-scroll h-full overflow-y-auto p-3 font-mono text-[13px] leading-relaxed"
      style={{ background: N.bg, color: N.primary }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* intro banner */}
      <div style={{ color: N.mutedFg }}>
        Nexis {version} — type <span style={{ color: N.yellow }}>help</span> for demo
        commands
      </div>

      {entries.map((e, i) =>
        e.kind === "cmd" ? (
          <div key={i} className="flex gap-2">
            <span style={{ color: N.green }}>{PROMPT}</span>
            <span>{e.text}</span>
          </div>
        ) : (
          <div key={i} className="whitespace-pre-wrap">
            {ansiToJsx(e.text)}
          </div>
        )
      )}

      {/* live input line */}
      <div className="flex gap-2">
        <span className="shrink-0" style={{ color: N.green }}>
          {PROMPT}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent outline-none"
          style={{ color: N.fg, caretColor: N.blue }}
        />
      </div>
    </div>
  );
}
