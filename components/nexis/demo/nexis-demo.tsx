"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useNexisGithub } from "@/lib/use-nexis-github";
import { N, type TreeNode } from "./demo-data";
import { DemoHeader } from "./demo-header";
import { SidebarRail } from "./sidebar-rail";
import { FileTree } from "./file-tree";
import { TerminalPane } from "./terminal-pane";
import { EditorPane } from "./editor-pane";
import { AIPanel } from "./ai-panel";
import { StatusBar } from "./status-bar";

export type Tab = {
  id: string;
  name: string;
  kind: "terminal" | "editor";
  path?: string;
  modified?: boolean;
};

const INITIAL_TABS: Tab[] = [
  { id: "zsh", name: "zsh", kind: "terminal" },
  {
    id: "nexis/src/app/App.tsx",
    name: "App.tsx",
    kind: "editor",
    path: "nexis/src/app/App.tsx",
    modified: true,
  },
  {
    id: "nexis/src/styles/globals.css",
    name: "globals.css",
    kind: "editor",
    path: "nexis/src/styles/globals.css",
    modified: true,
  },
];

function displayPath(tab: Tab | undefined): string {
  if (!tab || tab.kind === "terminal" || !tab.path) return "~/nexis";
  return `~/${tab.path}`;
}

export function NexisDemo() {
  const { version } = useNexisGithub();

  const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS);
  const [activeId, setActiveId] = useState<string | null>("zsh");
  const [aiOpen, setAiOpen] = useState(true);
  const [manualCollapse, setManualCollapse] = useState<boolean | null>(null);
  const [width, setWidth] = useState(1000);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-collapse the sidebar when the demo container narrows (§8.3).
  // Measure on mount + on window resize, with a ResizeObserver for
  // container-only changes — robust even where RO callbacks are throttled.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const autoCollapsed = width < 560;
  const sidebarCollapsed = manualCollapse ?? autoCollapsed;
  const showAi = aiOpen && width >= 680;

  const activeTab = tabs.find((t) => t.id === activeId);

  function openFile(node: TreeNode) {
    setTabs((prev) => {
      if (prev.some((t) => t.id === node.path)) return prev;
      return [
        ...prev,
        {
          id: node.path,
          name: node.name,
          kind: "editor",
          path: node.path,
          modified: node.modified,
        },
      ];
    });
    setActiveId(node.path);
  }

  function closeTab(id: string) {
    setTabs((prev) => {
      const remaining = prev.filter((t) => t.id !== id);
      if (id === activeId) {
        setActiveId(remaining.length ? remaining[remaining.length - 1].id : null);
      }
      return remaining;
    });
  }

  function toggleSidebar() {
    setManualCollapse((v) => (v === null ? !autoCollapsed : !v));
  }

  return (
    <section id="demo" className="dot-grid border-b border-hairline">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[80px]">
        <motion.p {...fadeUp(0)} className="caption-label text-ink-muted">
          Interactive
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="display-lg mt-3 text-ink">
          Try it yourself.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-4 max-w-xl text-body">
          Click files in the explorer · switch tabs · type commands · toggle the
          AI panel with <span className="text-brand">✦</span>
        </motion.p>

        <motion.div
          {...fadeUp(0.15)}
          ref={containerRef}
          className="mt-10 flex h-[560px] flex-col overflow-hidden rounded-[14px] sm:h-[580px]"
          style={{
            background: N.bg,
            border: `1px solid ${N.borderBright}`,
            boxShadow: "0 24px 60px -30px rgba(12,16,26,0.55)",
          }}
        >
          <DemoHeader
            tabs={tabs}
            activeId={activeId}
            onSelect={setActiveId}
            onClose={closeTab}
            aiOpen={showAi}
            onToggleAi={() => setAiOpen((v) => !v)}
            onToggleSidebar={toggleSidebar}
          />

          <div className="flex min-h-0 flex-1">
            {!sidebarCollapsed && (
              <aside
                className="flex w-[220px] shrink-0 flex-col"
                style={{ borderRight: `1px solid ${N.border}` }}
              >
                <SidebarRail />
                <div className="nx-scroll min-h-0 flex-1 overflow-y-auto">
                  <FileTree onOpenFile={openFile} activePath={activeTab?.path ?? null} />
                </div>
              </aside>
            )}

            <main className="min-w-0 flex-1">
              {!activeTab ? (
                <div
                  className="grid h-full place-items-center text-sm"
                  style={{ background: N.bg, color: N.mutedFg }}
                >
                  No tabs open
                </div>
              ) : activeTab.kind === "terminal" ? (
                <TerminalPane version={version} />
              ) : (
                <EditorPane name={activeTab.name} path={activeTab.path} />
              )}
            </main>

            {showAi && <AIPanel onClose={() => setAiOpen(false)} />}
          </div>

          <StatusBar path={displayPath(activeTab)} />
        </motion.div>
      </div>
    </section>
  );
}
