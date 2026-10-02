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
  Map,
  Activity,
  Paintbrush,
  FileText,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Site constants (nexis-site.md §1–2)                                */
/* ------------------------------------------------------------------ */
export const SITE = {
  name: "Nexis",
  tagline: "Everything in one window.",
  description:
    "An open-source, AI-native terminal and developer environment with focused workbenches for code, documents, web tools, local ML, repository intelligence, and SVG creation. No built-in usage analytics; use your own API keys or run local models.",
  repo: "https://github.com/rwetz/Nexis",
  releases: "https://github.com/rwetz/Nexis/releases",
  wiki: "https://wiki.nexisdev.org",
  fallbackVersion: "v1.30.1",
} as const;

// Fork / attribution block (Apache-2.0)
export const ATTRIBUTION = {
  license: "Apache-2.0",
  terax: "https://github.com/crynta/terax-ai",
  crynta: "https://github.com/crynta",
  youtube: "https://www.youtube.com/channel/UC59t7lAzjS0yA6HTk9Eg34A",
} as const;

/* ------------------------------------------------------------------ */
/*  Features grid (nexis-site.md §4)                                   */
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
      "Spotlight: files + commands with live preview",
    ],
  },
  {
    icon: Bot,
    title: "AI Agent",
    color: "#a78bfa",
    bullets: [
      "Reads & edits files, runs shell commands",
      "Searches the codebase, spawns sub-agents",
      "14 cloud, compatible, and local providers",
      "Policy-gated tools + Git-backed checkpoints",
      "Queue, Refactor, Review in one AI window",
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
      "Static Jupyter notebook viewer",
      "Code, markdown, stream, and error output",
      "No kernel or notebook server required",
    ],
  },
  {
    icon: Globe,
    title: "Web Workbench",
    color: "#06b6d4",
    bullets: [
      "Ports, HTTP client, and JSON/JWT/regex tools",
      "Inline browser preview with live reload",
      "Its own window, beside your code",
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
    title: "System & Process Tools",
    color: "#ec4899",
    bullets: [
      "View all running processes",
      "Monitor open ports alongside your workspace",
      "Kill or inspect processes inline",
    ],
  },
  {
    icon: Map,
    title: "Atlas",
    color: "#38bdf8",
    bullets: [
      "Machine-wide repository status",
      "Isometric map — files as buildings",
      "53-week commit heatmap from local git",
    ],
  },
  {
    icon: Activity,
    title: "Benchmark & ML Lab",
    color: "#c084fc",
    bullets: [
      "Compare ONNX and GGUF backends",
      "Train small models with a local engine",
      "Live metrics, run history, and reports",
    ],
  },
  {
    icon: Paintbrush,
    title: "SVG Studio",
    color: "#fb7185",
    bullets: [
      "Source and direct canvas editing",
      "Shapes, palettes, backdrops, icon review",
      "SVG, PNG, favicon, SMIL, and CSS export",
    ],
  },
  {
    icon: FileText,
    title: "Documents",
    color: "#e2e8f0",
    bullets: [
      "Rich-text editing for Markdown and Word",
      "Plain markdown saves back byte for byte",
      "Local PDF export in three themes",
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
  { action: "Spotlight: files & commands", keys: ["Ctrl", "P"] },
  { action: "Toggle bottom panel", keys: ["Ctrl", "J"] },
  { action: "Command palette", keys: ["Ctrl", "Shift", "P"] },
  { action: "Split pane", keys: ["Ctrl", "D"] },
  { action: "Open AI agent", keys: ["Ctrl", "I"] },
  { action: "Keyboard shortcuts", keys: ["Ctrl", "K"] },
  { action: "Open settings", keys: ["Ctrl", ","] },
  { action: "New window", keys: ["Ctrl", "Shift", "N"] },
  { action: "Switch workspace", keys: ["Ctrl", "`"] },
  { action: "Previous / next prompt", keys: ["Ctrl", "Shift", "↑ / ↓"] },
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
  "System Monitor",
  "Command History",
  "Atlas",
  "Benchmark",
  "HTTP Client",
  "Web Tools",
  "Documents",
  "Problems",
  "Palette",
  "Backdrop",
  "Icon Set",
  "Favicon Set",
  "Animator",
];

/* ------------------------------------------------------------------ */
/*  Screenshot showcase — 12 entries (nexis-site.md §7)                */
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
    file: "welcome.webp",
    caption:
      "A particle-built wordmark and the shortcuts you need first. It is what you see when no tabs are open.",
  },
  {
    label: "Code editor",
    accent: "#2dd4bf",
    file: "editor.webp",
    caption:
      "CodeMirror 6 with breadcrumbs, a minimap, AI inline completions and per-hunk diff approval.",
  },
  {
    label: "Spotlight",
    accent: "#38bdf8",
    file: "spotlight.webp",
    caption:
      "Ctrl/Cmd+P finds files and commands with a live preview. Subsequence ranking means “mtx” finds modules/terminal/index.ts.",
  },
  {
    label: "AI agent",
    accent: "#a78bfa",
    file: "ai.webp",
    caption:
      "Chat, Queue, Refactor, Templates and Review in one AI window. Bring your own key or run a local model.",
  },
  {
    label: "Terminal",
    accent: "#4ade80",
    file: "terminal.webp",
    caption:
      "Full PTY with WebGL rendering, split panes and shell integration.",
  },
  {
    label: "Documents",
    accent: "#e2e8f0",
    file: "documents-editor.webp",
    caption:
      "Rich-text editing for Markdown and Word in its own window, with local PDF export.",
  },
  {
    label: "Source control",
    accent: "#f97316",
    file: "source-control.webp",
    caption:
      "Stage, commit, push and review changes beside the code, with AI-written commit and PR descriptions.",
  },
  {
    label: "Atlas",
    accent: "#38bdf8",
    file: "atlas.webp",
    caption:
      "Every repo on the machine at a glance: branch, sync state, changes and a 53-week commit heatmap.",
  },
  {
    label: "SVG Studio",
    accent: "#fb7185",
    file: "svg-studio.webp",
    caption:
      "Draw, palettes, generative backdrops, icon review, favicons and animation in one workbench window.",
  },
  {
    label: "AI orb",
    accent: "#c084fc",
    file: "orb.webp",
    caption:
      "26 animated orb styles that think and speak with the agent. Ten follow your theme.",
  },
  {
    label: "Feature packs",
    accent: "#f97316",
    file: "features.webp",
    caption:
      "Presets and packs tune the surface without installing or removing code.",
  },
  {
    label: "Keyboard shortcuts",
    accent: "#fbbf24",
    file: "shortcuts.webp",
    caption:
      "Every command is remappable from a searchable shortcuts panel.",
  },
];
