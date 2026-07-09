import {
  Terminal,
  FileCode2,
  Bot,
  GitBranch,
  Code2,
  Zap,
  Layers,
  Globe,
  Server,
  Cpu,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Site constants (nexis-site.md §1–2)                                */
/* ------------------------------------------------------------------ */
export const SITE = {
  name: "Nexis",
  tagline: "Everything in one window.",
  description:
    "An open-source, AI-native terminal and developer environment built with Tauri and React. Under 10 MB, zero telemetry, runs entirely on your own API keys.",
  repo: "https://github.com/rwetz/Nexis",
  releases: "https://github.com/rwetz/Nexis/releases",
  wiki: "https://wiki.nexisdev.org",
  fallbackVersion: "v1.13.0",
} as const;

// Fork / attribution block (Apache-2.0)
export const ATTRIBUTION = {
  license: "Apache-2.0",
  terax: "https://github.com/crynta/terax-ai",
  crynta: "https://github.com/crynta",
  youtube: "https://www.youtube.com/channel/UC59t7lAzjS0yA6HTk9Eg34A",
} as const;

/* ------------------------------------------------------------------ */
/*  Features grid — 10 cards (nexis-site.md §4)                        */
/* ------------------------------------------------------------------ */
export type Feature = {
  icon: LucideIcon;
  title: string;
  color: string;
  bullets: string[];
};

export const FEATURES: Feature[] = [
  {
    icon: Terminal,
    title: "Terminal",
    color: "#4ade80",
    bullets: [
      "Full PTY — PowerShell, cmd, WSL distros",
      "Unlimited tabs + split panes",
      "Shell integration & history search",
      "WebGL xterm.js rendering",
    ],
  },
  {
    icon: FileCode2,
    title: "Code Editor",
    color: "#60a5fa",
    bullets: [
      "JS/TS, Python, Rust, HTML, CSS, Markdown, JSON",
      "AI inline autocomplete & per-hunk diff approval",
      "Vim mode + Prettier formatting",
      "Minimap, breadcrumbs, F2 rename",
    ],
  },
  {
    icon: Bot,
    title: "AI Agent",
    color: "#a78bfa",
    bullets: [
      "Reads & edits files, runs shell commands",
      "Searches the codebase, spawns sub-agents",
      "Claude, GPT-4, Gemini, Ollama support",
      "Keys stored in OS keychain — zero telemetry",
    ],
  },
  {
    icon: GitBranch,
    title: "Git & Source Control",
    color: "#f97316",
    bullets: [
      "Staging, diffs, and commit history",
      "Conflict resolution & stash management",
      "Worktrees & PR description generation",
    ],
  },
  {
    icon: Code2,
    title: "Debugger",
    color: "#f87171",
    bullets: [
      "DAP-based debugger",
      "Breakpoints & debug toolbar",
      "Variable inspection & call stack",
    ],
  },
  {
    icon: Zap,
    title: "Language Intelligence",
    color: "#2dd4bf",
    bullets: [
      "LSP completions & go-to-definition",
      "Hover docs & inline diagnostics",
      "Symbol search & F2 rename",
    ],
  },
  {
    icon: Layers,
    title: "Notebooks",
    color: "#fbbf24",
    bullets: [
      "Jupyter-style interactive notebooks",
      "Run cells inline with rich output",
      "Mix code, markdown, and results",
    ],
  },
  {
    icon: Globe,
    title: "Web Preview",
    color: "#06b6d4",
    bullets: [
      "Inline browser preview pane",
      "Live reload alongside your editor",
      "No context switching needed",
    ],
  },
  {
    icon: Server,
    title: "SSH & Containers",
    color: "#a78bfa",
    bullets: [
      "Connect to remote machines",
      "Full workspace over SSH",
      "Container environment support",
    ],
  },
  {
    icon: Cpu,
    title: "Process & Port Manager",
    color: "#ec4899",
    bullets: [
      "View all running processes",
      "Monitor open ports alongside your workspace",
      "Kill or inspect processes inline",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Keyboard shortcuts (nexis-site.md §5)                              */
/* ------------------------------------------------------------------ */
export type Shortcut = { action: string; keys: string[] };

export const SHORTCUTS: Shortcut[] = [
  { action: "New terminal", keys: ["Ctrl", "T"] },
  { action: "New editor tab", keys: ["Ctrl", "E"] },
  { action: "Quick open file", keys: ["Ctrl", "P"] },
  { action: "Command palette", keys: ["Ctrl", "Shift", "P"] },
  { action: "Split pane", keys: ["Ctrl", "D"] },
  { action: "Open AI agent", keys: ["Ctrl", "I"] },
  { action: "Keyboard shortcuts", keys: ["Ctrl", "K"] },
  { action: "Open settings", keys: ["Ctrl", ","] },
  { action: "New window", keys: ["Ctrl", "Shift", "N"] },
  { action: "Switch workspace", keys: ["Ctrl", "`"] },
];

/* ------------------------------------------------------------------ */
/*  Sidebar panels — 23 pills (nexis-site.md §6)                       */
/* ------------------------------------------------------------------ */
export const PANELS: string[] = [
  "Files",
  "Recent Files",
  "Source Control",
  "Processes",
  "Outline",
  "Debugger",
  "Tests",
  "Build",
  "Bookmarks",
  "Ports",
  "Profiles",
  "REPL",
  "Snippets",
  "Database",
  "Code Review",
  "Agent Queue",
  "Symbol Search",
  "AI Refactor",
  "Prompt Templates",
  "Workspace Notes",
  "Shell Snippets",
  "SSH",
  "Release",
];

/* ------------------------------------------------------------------ */
/*  Screenshot showcase — 8 entries (nexis-site.md §7)                 */
/* ------------------------------------------------------------------ */
export type Screenshot = {
  label: string;
  accent: string;
  file: string;
  caption: string;
};

export const SCREENSHOTS: Screenshot[] = [
  {
    label: "Welcome screen",
    accent: "#60a5fa",
    file: "welcome.png",
    caption:
      "Clean start. Quick access to recent workspaces and projects the moment you open the app.",
  },
  {
    label: "Code editor",
    accent: "#2dd4bf",
    file: "editor.png",
    caption:
      "Syntax highlighting, AI inline completions, breadcrumbs, and a minimap — all in one pane.",
  },
  {
    label: "AI agent",
    accent: "#a78bfa",
    file: "ai.png",
    caption:
      "Bring your own API key. Claude, GPT-4, Gemini, or a local Ollama model — zero telemetry.",
  },
  {
    label: "Terminal",
    accent: "#4ade80",
    file: "terminal.png",
    caption:
      "Full PTY with WebGL rendering. Split panes, tab history, and shell integration built in.",
  },
  {
    label: "Markdown viewer",
    accent: "#8a9db8",
    file: "markdown.png",
    caption:
      "Render README files, docs, and notes inline. No switching to a browser to preview markdown.",
  },
  {
    label: "Feature browser",
    accent: "#f97316",
    file: "features.png",
    caption:
      "Every capability listed and searchable from inside the app. Discover what Nexis can do at a glance.",
  },
  {
    label: "Settings",
    accent: "#f97316",
    file: "settings.png",
    caption:
      "Granular control over themes, keybinds, AI models, fonts, and workspace behaviour.",
  },
  {
    label: "Keyboard shortcuts",
    accent: "#fbbf24",
    file: "shortcuts.png",
    caption:
      "Every command is customizable. Remap anything from a searchable shortcuts panel.",
  },
];
