"use client";

import { useState } from "react";
import {
  AlignLeft,
  Bookmark,
  Bot,
  Clock3,
  Code2,
  Cpu,
  Database,
  FileText,
  FlaskConical,
  Folder,
  GitBranch,
  GitPullRequest,
  Hammer,
  History,
  Network,
  Rocket,
  ScrollText,
  Search,
  Server,
  Share2,
  SquareTerminal,
  StickyNote,
  User,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { N } from "./demo-data";

type RailItem = { label: string; icon: LucideIcon; badge?: number };

const RAIL: RailItem[] = [
  { label: "Files", icon: Folder },
  { label: "Recent Files", icon: Clock3 },
  { label: "Source Control", icon: GitBranch, badge: 2 },
  { label: "Processes", icon: Cpu },
  { label: "Ports", icon: Network },
  { label: "Profiles", icon: User },
  { label: "REPL", icon: SquareTerminal },
  { label: "Outline", icon: AlignLeft },
  { label: "Snippets", icon: Code2 },
  { label: "Tests", icon: FlaskConical },
  { label: "Database", icon: Database },
  { label: "Build", icon: Hammer },
  { label: "Code Review", icon: GitPullRequest },
  { label: "Agent Queue", icon: Bot },
  { label: "Symbol Search", icon: Search },
  { label: "AI Refactor", icon: Wand2 },
  { label: "Share", icon: Share2 },
  { label: "Prompt Templates", icon: FileText },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Notes", icon: StickyNote },
  { label: "Shell Snippets", icon: ScrollText },
  { label: "SSH", icon: Server },
  { label: "Release", icon: Rocket },
];

export function SidebarRail() {
  const [active, setActive] = useState("Files");

  return (
    <div
      className="nx-scroll flex items-center gap-0.5 overflow-x-auto px-1.5 py-1.5"
      style={{ borderBottom: `1px solid ${N.border}` }}
    >
      {RAIL.map((item) => {
        const Icon = item.icon;
        const isActive = item.label === active;
        return (
          <button
            key={item.label}
            title={item.label}
            aria-label={item.label}
            onClick={() => setActive(item.label)}
            className="relative grid size-7 shrink-0 place-items-center rounded-md transition-colors"
            style={{
              color: isActive ? N.fg : N.mutedFg,
              background: isActive ? N.hover : "transparent",
            }}
          >
            <Icon className="size-[15px]" />
            {item.badge && (
              <span
                className="absolute -right-0.5 -top-0.5 grid size-3.5 place-items-center rounded-full text-[9px] font-semibold"
                style={{ background: N.blue, color: N.bg }}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
      <span className="mx-1 h-4 w-px shrink-0" style={{ background: N.border }} />
      <button
        title="Commit history"
        aria-label="Commit history"
        className="grid size-7 shrink-0 place-items-center rounded-md transition-colors"
        style={{ color: N.mutedFg }}
      >
        <History className="size-[15px]" />
      </button>
    </div>
  );
}
