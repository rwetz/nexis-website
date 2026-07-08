/* ------------------------------------------------------------------ */
/*  Interactive demo data + theme (nexis-site.md §8)                   */
/* ------------------------------------------------------------------ */

/** Dark theme tokens used throughout the demo (§8.1). */
export const N = {
  bg: "#1b2232",
  card: "#242e3f",
  hover: "#2d3a4f",
  fg: "#f0f4f9",
  primary: "#d8e4ef",
  muted: "#2c3a50",
  mutedFg: "#8a9db8",
  border: "rgba(255,255,255,0.09)",
  borderBright: "rgba(255,255,255,0.13)",
  ring: "#4d6480",
  green: "#4ade80",
  red: "#f87171",
  yellow: "#fbbf24",
  blue: "#60a5fa",
  purple: "#a78bfa",
  teal: "#2dd4bf",
} as const;

/* -------------------------------- File tree (§8.3) ---------------- */
export type TreeNode = {
  name: string;
  type: "dir" | "file";
  path: string;
  modified?: boolean;
  open?: boolean;
  children?: TreeNode[];
};

export const INITIAL_TREE: TreeNode[] = [
  {
    name: "nexis",
    type: "dir",
    path: "nexis",
    open: true,
    children: [
      {
        name: "src",
        type: "dir",
        path: "nexis/src",
        open: true,
        children: [
          {
            name: "app",
            type: "dir",
            path: "nexis/src/app",
            open: true,
            children: [
              { name: "App.tsx", type: "file", path: "nexis/src/app/App.tsx", modified: true },
              { name: "WelcomeScreen.tsx", type: "file", path: "nexis/src/app/WelcomeScreen.tsx" },
            ],
          },
          { name: "components", type: "dir", path: "nexis/src/components", open: false, children: [] },
          { name: "modules", type: "dir", path: "nexis/src/modules", open: false, children: [] },
          {
            name: "styles",
            type: "dir",
            path: "nexis/src/styles",
            open: true,
            children: [
              { name: "globals.css", type: "file", path: "nexis/src/styles/globals.css", modified: true },
            ],
          },
        ],
      },
      { name: "src-tauri", type: "dir", path: "nexis/src-tauri", open: false, children: [] },
      { name: "package.json", type: "file", path: "nexis/package.json" },
      { name: "README.md", type: "file", path: "nexis/README.md" },
    ],
  },
];

/** File-icon color by extension (§8.3). */
export function fileColor(name: string): string {
  if (/\.(tsx|ts|jsx)$/.test(name)) return N.blue;
  if (/\.js$/.test(name)) return "#f0db4f";
  if (/\.css$/.test(name)) return N.purple;
  if (/\.json$/.test(name)) return N.yellow;
  if (/\.md$/.test(name)) return N.mutedFg;
  return N.mutedFg;
}

/* -------------------------------- Editor content (§8.6) ----------- */
export type EditorFile = { lang: "tsx" | "css"; code: string };

const APP_TSX = `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { QuickFilePicker } from '@/components/QuickFilePicker'
import { WorkspaceSwitcher } from '@/components/WorkspaceSwitcher'
import { CommandPalette } from '@/components/CommandPalette'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSidebarState } from '@/hooks/useSidebarState'
import { useDialogCoordinator } from '@/hooks/useDialogCoordinator'
import { FloatingAiPanel, hasAnyKey, useChatStore } from '@/modules/ai'
import { AiComposerProvider } from '@/modules/ai/composer'
import { EditorStack } from '@/modules/editor/EditorStack'
import { FileExplorer } from '@/modules/files/FileExplorer'
import { Header } from '@/components/Header'
import { SidebarRail } from '@/components/SidebarRail'
import { StatusBar } from '@/components/StatusBar'
import { TerminalStack } from '@/modules/terminal/TerminalStack'
import { useTabs } from '@/modules/tabs/useTabs'
import { useWorkspaceCwd } from '@/hooks/useWorkspaceCwd'

export default function App() {
  const { tabs, activeTab, openTab, closeTab } = useTabs()
  const cwd = useWorkspaceCwd()
  const sidebar = useSidebarState()
  const dialogs = useDialogCoordinator()
  const showAi = hasAnyKey() && useChatStore((s) => s.open)

  return (
    <TooltipProvider>
      <AiComposerProvider>
        <ErrorBoundary>
          <div className="flex h-screen flex-col">
            <Header cwd={cwd} onToggleSidebar={sidebar.toggle} />
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={18} minSize={12} collapsible>
                <SidebarRail />
                <FileExplorer onOpen={openTab} />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <EditorStack tabs={tabs} active={activeTab} onClose={closeTab} />
                <TerminalStack cwd={cwd} />
              </ResizablePanel>
              {showAi && <FloatingAiPanel />}
            </ResizablePanelGroup>
            <StatusBar branch="main" cwd={cwd} />
            <QuickFilePicker open={dialogs.quickOpen} />
            <WorkspaceSwitcher open={dialogs.switcher} />
            <CommandPalette open={dialogs.palette} />
          </div>
        </ErrorBoundary>
      </AiComposerProvider>
    </TooltipProvider>
  )
}
`;

const GLOBALS_CSS = `@import "tailwindcss";

/* Nexis editor + terminal theme — Tailwind v4 @theme tokens */
@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-card: oklch(1 0 0);
  --color-primary: oklch(0.21 0.006 285.885);
  --color-muted: oklch(0.967 0.001 286.375);
  --color-muted-foreground: oklch(0.552 0.016 285.938);
  --color-border: oklch(0.92 0.004 286.32);
  --radius: 0.625rem;
}

:root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: oklch(0.145 0 0);
    --color-foreground: oklch(0.985 0 0);
    --color-card: oklch(0.205 0 0);
    --color-muted-foreground: oklch(0.708 0 0);
    --color-border: oklch(1 0 0 / 10%);
  }
}

body {
  font-family: var(--font-sans);
  background: var(--color-background);
  color: var(--color-foreground);
}
`;

export const EDITOR_CONTENT: Record<string, EditorFile> = {
  "App.tsx": { lang: "tsx", code: APP_TSX },
  "globals.css": { lang: "css", code: GLOBALS_CSS },
};

/* -------------------------------- Terminal (§8.5) ----------------- */
export const PROMPT = "ryan@nexis ~/nexis $";

export type CmdResult = { clear: true } | { lines: string[] };

/**
 * Canned shell (§8.5). Case-sensitive exact match on trimmed input.
 * Output strings may embed ANSI codes, rendered by ansiToJsx().
 */
export function runCommand(
  raw: string,
  ctx: { version: string; platform: string }
): CmdResult {
  const cmd = raw.trim();
  switch (cmd) {
    case "help":
      return {
        lines: [
          "Demo commands:",
          "  \x1b[33mls\x1b[0m           list directory contents",
          "  \x1b[33mls -la\x1b[0m       detailed listing",
          "  \x1b[33mgit status\x1b[0m   show the working tree status",
          "  \x1b[33mgit log\x1b[0m      show recent commits",
          "  \x1b[33mnexis -v\x1b[0m     print version info",
          "  \x1b[33mclear\x1b[0m        clear the terminal",
        ],
      };
    case "ls":
      return {
        lines: [
          "\x1b[34msrc\x1b[0m  \x1b[34msrc-tauri\x1b[0m  \x1b[34mpublic\x1b[0m  package.json  tsconfig.json  README.md  vite.config.ts",
        ],
      };
    case "ls -la":
      return {
        lines: [
          "total 48",
          "drwxr-xr-x   9 ryan  staff   288B  Jul  7 14:22 \x1b[34m.\x1b[0m",
          "drwxr-xr-x   5 ryan  staff   160B  Jul  7 09:10 \x1b[34m..\x1b[0m",
          "drwxr-xr-x  14 ryan  staff   448B  Jul  7 14:22 \x1b[34msrc\x1b[0m",
          "drwxr-xr-x   8 ryan  staff   256B  Jul  7 11:03 \x1b[34msrc-tauri\x1b[0m",
          "-rw-r--r--   1 ryan  staff   1.2K  Jul  7 14:22 package.json",
          "-rw-r--r--   1 ryan  staff   612B  Jul  7 09:10 tsconfig.json",
          "-rw-r--r--   1 ryan  staff   3.4K  Jul  7 13:58 README.md",
        ],
      };
    case "git status":
      return {
        lines: [
          "On branch \x1b[32mmain\x1b[0m",
          "Changes not staged for commit:",
          '  (use "git add <file>..." to update what will be committed)',
          "",
          "        \x1b[31mmodified:   src/app/App.tsx\x1b[0m",
          "        \x1b[31mmodified:   src/styles/globals.css\x1b[0m",
          "",
          'no changes added to commit (use "git add" and/or "git commit -a")',
        ],
      };
    case "git log":
      return {
        lines: [
          "\x1b[33ma1b9f42\x1b[0m  feat: per-hunk diff approval in the editor",
          "\x1b[33m7c3e0d1\x1b[0m  fix: WebGL renderer flicker on tab switch",
          "\x1b[33m2f8a6b5\x1b[0m  feat: SSH workspace over a remote PTY",
          "\x1b[33m9d4c1e0\x1b[0m  chore: bump Tauri to 2.0",
        ],
      };
    case "pwd":
      return { lines: ["~/nexis"] };
    case "whoami":
      return { lines: ["ryan"] };
    case "clear":
      return { clear: true };
    case "nexis -v":
      return {
        lines: [
          `Nexis ${ctx.version}`,
          "Runtime: \x1b[36mTauri 2\x1b[0m · \x1b[35mRust 1.87\x1b[0m · \x1b[34mReact 19\x1b[0m",
          `Platform: ${ctx.platform}`,
          "License: Apache-2.0",
        ],
      };
    default:
      return { lines: [`\x1b[31mbash: ${cmd}: command not found\x1b[0m`] };
  }
}

/* -------------------------------- AI panel (§8.7) ----------------- */
export type AiMsg = {
  role: "user" | "assistant";
  text: string;
  tool?: { name: string; path: string; status: "done" };
};

export const AI_MESSAGES: AiMsg[] = [
  {
    role: "user",
    text: "can you extract the tab-open logic in App.tsx into a custom hook?",
  },
  {
    role: "assistant",
    text: "Sure — I'll pull the tab state and the openTab/closeTab handlers out of App.tsx into a useTabs hook so the shell layout stays declarative.",
    tool: { name: "str_replace_editor", path: "src/modules/tabs/useTabs.ts", status: "done" },
  },
  {
    role: "user",
    text: "looks good, also add a pinTab function",
  },
  {
    role: "assistant",
    text: "Done — added pinTab(id) that converts a preview tab to persistent. I've also updated TabBar to call it on double-click.",
  },
];

export const AI_MODEL = "claude-sonnet-4-6";
