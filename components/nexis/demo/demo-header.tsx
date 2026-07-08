"use client";

import {
  File as FileIcon,
  Keyboard,
  LayoutGrid,
  PanelLeft,
  Plus,
  Settings,
  Sparkles,
  Terminal as TerminalIcon,
  X,
} from "lucide-react";
import { N, fileColor } from "./demo-data";
import type { Tab } from "./nexis-demo";

const TRAFFIC = ["#ff5f57", "#febc2e", "#28c840"];

export function DemoHeader({
  tabs,
  activeId,
  onSelect,
  onClose,
  aiOpen,
  onToggleAi,
  onToggleSidebar,
}: {
  tabs: Tab[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  aiOpen: boolean;
  onToggleAi: () => void;
  onToggleSidebar: () => void;
}) {
  return (
    <div
      className="flex h-10 shrink-0 items-stretch"
      style={{ background: N.card, borderBottom: `1px solid ${N.border}` }}
    >
      {/* traffic lights + pane toggles */}
      <div className="flex items-center gap-3 pl-3 pr-2">
        <div className="flex items-center gap-1.5">
          {TRAFFIC.map((c) => (
            <span key={c} className="size-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          <IconBtn label="Toggle sidebar" onClick={onToggleSidebar}>
            <PanelLeft className="size-4" />
          </IconBtn>
          <IconBtn label="Split terminal">
            <LayoutGrid className="size-4" />
          </IconBtn>
        </div>
      </div>

      {/* tab bar */}
      <div className="nx-scroll flex flex-1 items-stretch overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className="group flex h-full min-w-0 cursor-pointer items-center gap-2 px-3 text-[13px]"
              style={{
                background: isActive ? N.bg : "transparent",
                color: isActive ? N.fg : N.mutedFg,
                borderRight: `1px solid ${N.border}`,
              }}
            >
              {tab.kind === "terminal" ? (
                <TerminalIcon className="size-3.5 shrink-0" style={{ color: N.green }} />
              ) : (
                <FileIcon className="size-3.5 shrink-0" style={{ color: fileColor(tab.name) }} />
              )}
              <span className="truncate">{tab.name}</span>
              {tab.modified && (
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: N.mutedFg }}
                  title="Unsaved"
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
                aria-label={`Close ${tab.name}`}
                className={`grid size-4 shrink-0 place-items-center rounded transition-opacity hover:bg-white/10 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <X className="size-3" />
              </button>
            </div>
          );
        })}
        <IconBtn label="New tab" className="mx-1 my-auto">
          <Plus className="size-4" />
        </IconBtn>
      </div>

      {/* right cluster */}
      <div className="flex items-center gap-0.5 px-2">
        <IconBtn
          label="Toggle AI panel"
          onClick={onToggleAi}
          active={aiOpen}
        >
          <Sparkles className="size-4" />
        </IconBtn>
        <IconBtn label="Keyboard shortcuts">
          <Keyboard className="size-4" />
        </IconBtn>
        <IconBtn label="Settings">
          <Settings className="size-4" />
        </IconBtn>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`grid size-7 place-items-center rounded-md transition-colors hover:bg-white/10 ${className ?? ""}`}
      style={{ color: active ? N.purple : N.mutedFg }}
    >
      {children}
    </button>
  );
}
