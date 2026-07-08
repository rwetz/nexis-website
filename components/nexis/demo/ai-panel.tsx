"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Sparkles, X } from "lucide-react";
import { AI_MESSAGES, AI_MODEL, N, type AiMsg } from "./demo-data";

type Msg = AiMsg & { working?: boolean };

export function AIPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(AI_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function submit() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    // Never resolves further — just an animated "thinking" bubble (§8.7).
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: "", working: true }]);
    }, 600);
  }

  return (
    <div
      className="flex h-full w-[272px] shrink-0 flex-col"
      style={{ background: N.card, borderLeft: `1px solid ${N.border}` }}
    >
      {/* header */}
      <div
        className="flex shrink-0 items-center justify-between px-3 py-2.5"
        style={{ borderBottom: `1px solid ${N.border}` }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="size-4" style={{ color: N.purple }} />
          <span className="text-[13px] font-semibold" style={{ color: N.fg }}>
            AI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px]"
            style={{ background: N.muted, color: N.mutedFg }}
          >
            {AI_MODEL}
          </span>
          <button
            onClick={onClose}
            aria-label="Close AI panel"
            className="grid size-6 place-items-center rounded hover:bg-white/10"
            style={{ color: N.mutedFg }}
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="nx-scroll flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            <div className="max-w-[92%]">
              <div
                className="rounded-lg px-2.5 py-2 text-[12.5px] leading-relaxed"
                style={{
                  background: m.role === "user" ? N.muted : N.hover,
                  color: m.role === "user" ? N.fg : N.primary,
                }}
              >
                {m.working ? (
                  <span className="flex items-center gap-2" style={{ color: N.mutedFg }}>
                    Working on it
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="size-1.5 rounded-full"
                          style={{
                            background: N.mutedFg,
                            animation: "nx-bounce 1s infinite",
                            animationDelay: `${d * 0.16}s`,
                          }}
                        />
                      ))}
                    </span>
                  </span>
                ) : (
                  m.text
                )}
              </div>

              {m.tool && (
                <div
                  className="mt-1.5 flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[11px]"
                  style={{ background: N.bg, border: `1px solid ${N.border}`, color: N.mutedFg }}
                >
                  <span style={{ color: N.purple }}>{m.tool.name}</span>
                  <span className="truncate" style={{ color: N.blue }}>
                    {m.tool.path}
                  </span>
                  <span className="ml-auto flex items-center gap-1" style={{ color: N.green }}>
                    <CheckCircle2 className="size-3" />
                    {m.tool.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* input */}
      <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${N.border}` }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask the agent…"
          aria-label="Message the AI agent"
          className="w-full rounded-md px-2.5 py-2 text-[12.5px] outline-none"
          style={{ background: N.bg, color: N.fg, border: `1px solid ${N.border}` }}
        />
        <div className="mt-1.5 px-1 font-mono text-[10px]" style={{ color: N.mutedFg }}>
          @ files · # snippets · /commands
        </div>
      </div>
    </div>
  );
}
