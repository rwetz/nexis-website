# Nexis Project Page — Content & Asset Extract

Source: `minimal-design` branch, [src/components/Nexis.jsx](src/components/Nexis.jsx) (as of extraction, 1481 lines).
Route: `#nexis` (hash-routed subpage, see `src/App.jsx`, `src/components/CommandPalette.jsx`, `src/components/Projects.jsx`, `src/components/Hero.jsx`).

Screenshot assets copied to `nexis-site-assets/` in this repo root:
`ai.png`, `editor.png`, `features.png`, `markdown.png`, `settings.png`, `shortcuts.png`, `terminal.png`, `welcome.png`
(originals live at `src/assets/nexis/*.png` on `minimal-design`; the page also imports `src/assets/logo (1) (1).png` as the Nexis app icon and `src/assets/signature.png` for the nav signature mark).

---

## 1. What Nexis is

> Open-source, AI-native terminal and developer environment built with Tauri and React. Under 10 MB, zero telemetry, runs on your own API keys.

- Forked from **Terax** by **crynta** (https://github.com/crynta/terax-ai, https://github.com/crynta) — extended with additional features, panels, and AI integrations under the **Apache-2.0** license.
- Attribution block on the page links: `terax-ai` repo, `crynta` GitHub profile, and a YouTube channel (https://www.youtube.com/channel/UC59t7lAzjS0yA6HTk9Eg34A).
- Repo: https://github.com/rwetz/Nexis
- Releases: https://github.com/rwetz/Nexis/releases

## 2. Live GitHub data

The page fetches live stats via `useNexisGithub()`:
- `GET https://api.github.com/repos/rwetz/Nexis` → stars, forks, pushed_at
- `GET https://api.github.com/repos/rwetz/Nexis/releases/latest` → version tag
- Cached in `sessionStorage` under key `nexis_gh_v1`, shown immediately, then refreshed in background.
- Fallback version if fetch fails: `v1.13.0`.

### Stats strip (hero)
- `{version}` — Latest release
- `< 10 MB` — App size
- `0` — Telemetry
- `3` — Platforms
- `{gh.stars}` — GitHub stars (only shown once fetched)

## 3. Page sections (in order)

1. **Nav** — sticky, dot-grid background, signature image linking to `#hero`, "/" separator, Nexis logo + wordmark.
2. **Hero** — "Project" eyebrow, logo + "Nexis" H1, description paragraph, attribution/fork-credit box, CTA buttons (**View on GitHub** with star count, **Download {version}**), stats strip.
3. **Features grid** — "Everything in one window." 10 feature cards (icon, title, color, bullet list) — see §4.
4. **Shortcuts + Panels** (dark section, bg `#181d26`) — two columns: keyboard shortcuts list and sidebar-panel pill list — see §5 and §6.
5. **Screenshot showcase** — "Built for real workflows." 2-column grid of 8 captioned screenshots — see §7.
6. **Interactive demo** — "Try it yourself." Full embedded fake-IDE demo (`NexisDemo`) — see §8.
7. **CTA (dark)** — "Star the repo, file issues, or open a pull request." + GitHub button.

## 4. Features (10 cards)

| Icon | Title | Color | Bullets |
|---|---|---|---|
| Terminal | Terminal | `#4ade80` (green) | Full PTY — PowerShell, cmd, WSL distros · Unlimited tabs + split panes · Shell integration & history search · WebGL xterm.js rendering |
| FileCode2 | Code Editor | `#60a5fa` (blue) | JS/TS, Python, Rust, HTML, CSS, Markdown, JSON · AI inline autocomplete & per-hunk diff approval · Vim mode + Prettier formatting · Minimap, breadcrumbs, F2 rename |
| Bot | AI Agent | `#a78bfa` (purple) | Reads & edits files, runs shell commands · Searches the codebase, spawns sub-agents · Claude, GPT-4, Gemini, Ollama support · Keys stored in OS keychain — zero telemetry |
| GitBranch | Git & Source Control | `#f97316` (orange) | Staging, diffs, and commit history · Conflict resolution & stash management · Worktrees & PR description generation |
| Code2 | Debugger | `#f87171` (red) | DAP-based debugger · Breakpoints & debug toolbar · Variable inspection & call stack |
| Zap | Language Intelligence | `#2dd4bf` (teal) | LSP completions & go-to-definition · Hover docs & inline diagnostics · Symbol search & F2 rename |
| Layers | Notebooks | `#fbbf24` (yellow) | Jupyter-style interactive notebooks · Run cells inline with rich output · Mix code, markdown, and results |
| Globe | Web Preview | `#06b6d4` | Inline browser preview pane · Live reload alongside your editor · No context switching needed |
| Server | SSH & Containers | `#a78bfa` | Connect to remote machines · Full workspace over SSH · Container environment support |
| Cpu | Process & Port Manager | `#ec4899` | View all running processes · Monitor open ports alongside your workspace · Kill or inspect processes inline |

## 5. Keyboard shortcuts list

| Action | Keys |
|---|---|
| New terminal | Ctrl T |
| New editor tab | Ctrl E |
| Quick open file | Ctrl P |
| Command palette | Ctrl Shift P |
| Split pane | Ctrl D |
| Open AI agent | Ctrl I |
| Keyboard shortcuts | Ctrl K |
| Open settings | Ctrl , |
| New window | Ctrl Shift N |
| Switch workspace | Ctrl \` |

## 6. Sidebar panels (pill list, 23 total)

Files, Recent Files, Source Control, Processes, Outline, Debugger, Tests, Build, Bookmarks, Ports, Profiles, REPL, Snippets, Database, Code Review, Agent Queue, Symbol Search, AI Refactor, Prompt Templates, Workspace Notes, Shell Snippets, SSH, Release

(Note: the interactive demo's `SidebarRail` rail-icon list is similar but not identical — it includes items like "Files", "Recent Files", "Source Control" (badge 2), "Processes", "Ports", "Profiles", "REPL", "Outline", "Snippets", "Tests", "Database", "Build", "Code Review", "Agent Queue", "Symbol Search", "AI Refactor", "Share", "Prompt Templates", "Bookmarks", "Notes", "Shell Snippets", "SSH", "Release" — 22 icons plus a commit-history button.)

## 7. Screenshot showcase (8 entries)

Each: screenshot image (natural height, no crop) + colored dot + label + caption.

| Label | Accent color | Image file | Caption |
|---|---|---|---|
| Welcome screen | blue `#60a5fa` | `welcome.png` | Clean start. Quick access to recent workspaces and projects the moment you open the app. |
| Code editor | teal `#2dd4bf` | `editor.png` | Syntax highlighting, AI inline completions, breadcrumbs, and a minimap — all in one pane. |
| AI agent | purple `#a78bfa` | `ai.png` | Bring your own API key. Claude, GPT-4, Gemini, or a local Ollama model — zero telemetry. |
| Terminal | green `#4ade80` | `terminal.png` | Full PTY with WebGL rendering. Split panes, tab history, and shell integration built in. |
| Markdown viewer | muted gray `#8a9db8` | `markdown.png` | Render README files, docs, and notes inline. No switching to a browser to preview markdown. |
| Feature browser | orange `#f97316` | `features.png` | Every capability listed and searchable from inside the app. Discover what Nexis can do at a glance. |
| Settings | orange `#f97316` | `settings.png` | Granular control over themes, keybinds, AI models, fonts, and workspace behaviour. |
| Keyboard shortcuts | yellow `#fbbf24` | `shortcuts.png` | Every command is customizable. Remap anything from a searchable shortcuts panel. |

Grid layout: `repeat(2, 1fr)`, 32px gap, white cards with `#c8ccd2` border, 14px radius.

## 8. Interactive demo (`NexisDemo`)

A fully working fake-IDE mockup embedded directly in the page (580px tall, rounded, bordered, shadow). Intro copy: *"Click files in the explorer · switch tabs · type commands · toggle the AI panel with ✦"*.

### 8.1 Dark theme tokens used throughout (`N`)
```
bg:       #1b2232
card:     #242e3f
hover:    #2d3a4f
fg:       #f0f4f9
primary:  #d8e4ef
muted:    #2c3a50
mutedFg:  #8a9db8
border:   rgba(255,255,255,0.09)
borderBr: rgba(255,255,255,0.13)
ring:     #4d6480
green:    #4ade80
red:      #f87171
yellow:   #fbbf24
blue:     #60a5fa
purple:   #a78bfa
teal:     #2dd4bf
```

### 8.2 Header
- macOS traffic-light dots (close/min/max, non-functional decoration).
- Sidebar toggle button (PanelLeft icon).
- Split-terminal button (LayoutGrid icon, decorative).
- Tab bar (see 8.4).
- Right cluster: AI-panel toggle (Sparkles), keyboard-shortcuts button (Keyboard, decorative), settings button (Settings, decorative).

### 8.3 Left sidebar
- **File tree** (`FileTree` component) rendering a static/interactive `INITIAL_TREE`:
  ```
  nexis/ (open)
    src/ (open)
      app/ (open)
        App.tsx
        WelcomeScreen.tsx
      components/ (closed)
      modules/ (closed)
      styles/ (open)
        globals.css
    src-tauri/ (closed)
    package.json
    README.md
  ```
  Clicking a directory toggles open/closed; clicking a file opens/selects it (opens a new editor tab if not already open). `globals.css` and `App.tsx` show an "M" (modified) badge. File icon colors by extension: tsx/ts/jsx → blue, js → `#f0db4f`, css → purple, json → yellow, md → muted.
- **Sidebar rail** (`SidebarRail`) — horizontal scrollable strip of 22 icon buttons (Files, Recent Files, Source Control [badge 2], Processes, Ports, Profiles, REPL, Outline, Snippets, Tests, Database, Build, Code Review, Agent Queue, Symbol Search, AI Refactor, Share, Prompt Templates, Bookmarks, Notes, Shell Snippets, SSH, Release) plus a commit-history icon. Only visual state changes on click (`railView`), no content changes currently wired to it.
- Sidebar auto-collapses via `ResizeObserver` when the demo container narrows below 560px.

### 8.4 Tabs
Initial tabs: `zsh` (terminal, Terminal icon), `App.tsx` (editor), `globals.css` (editor). Tabs are closable (X button appears on hover); closing the active tab activates the last remaining tab. "+" button present but non-functional (decorative "new tab").

### 8.5 Terminal pane (`TerminalPane`) — the interactive terminal
Fully functional mini shell simulator:
- Prompt string: `ryan@nexis ~/nexis $`
- Intro line: `Nexis {version} — type help for demo commands` (yellow "help").
- **Canned commands** (`CANNED_CMDS`), case-sensitive exact match on trimmed input:
  - `help` → lists demo commands (ls, git status, git log, nexis -v, clear)
  - `ls` → `src  src-tauri  public  package.json  tsconfig.json  README.md  vite.config.ts` (dirs in blue)
  - `ls -la` → detailed listing with permissions/owner/size/date
  - `git status` → `On branch main` + unstaged changes for `App.tsx` and `globals.css`
  - `git log` → 4 fake commit hashes/messages (yellow hashes)
  - `pwd` → `~/nexis`
  - `whoami` → `ryan`
  - `clear` → clears the scrollback (`__clear__` sentinel)
  - `nexis -v` → `Nexis {version}\nRuntime: Tauri 2 · Rust 1.87 · React 19\nPlatform: {navigator.platform}\nLicense: Apache-2.0` (version is live-injected from GitHub release fetch)
  - Anything else → `bash: {cmd}: command not found` (red)
- ANSI color codes (`\x1b[31m` etc.) are parsed by `ansiToJsx()` and mapped to the theme's red/green/yellow/blue/purple/teal.
- Command history: ArrowUp/ArrowDown cycles through previously entered commands (like real shell history).
- Auto-scrolls the terminal's own container (not the page) to bottom on new output.
- Clicking anywhere in the pane focuses the hidden input.
- Input is a real `<input>` styled to look like inline terminal text (transparent bg, blue caret, no outline).

### 8.6 Editor pane (`EditorPane`)
- Breadcrumb bar: `src / app|styles / {filename}`.
- Line-numbered code view with a hand-rolled regex-based syntax highlighter (`syntaxHighlight`) for `tsx/ts` and `css`:
  - tsx: comments, strings, keywords (`import export from default const let var return function type interface extends implements if else for while async await void null undefined true false`), capitalized identifiers, `@decorators`.
  - css: comments, `@rules`, `--custom-properties`, values, property names.
- Two canned file contents in `EDITOR_CONTENT`:
  - **`App.tsx`** — a fictional Nexis `App.tsx` source (imports ResizablePanelGroup, ErrorBoundary, QuickFilePicker, WorkspaceSwitcher, CommandPalette, TooltipProvider, useSidebarState, useDialogCoordinator, FloatingAiPanel/hasAnyKey/useChatStore from `@/modules/ai`, AiComposerProvider, EditorStack, FileExplorer, Header, SidebarRail, StatusBar, TerminalStack, useTabs/useWorkspaceCwd) rendering the shell layout.
  - **`globals.css`** — Tailwind v4 `@theme` setup with oklch light/dark color tokens (background, foreground, card, primary, muted, muted-foreground, border, radius) — this mirrors the *real* site's own `globals.css` theme convention.
- Any other opened file (no canned content) shows just its filename centered in the pane as a placeholder.

### 8.7 AI panel (`AIPanel`, toggled via Sparkles button)
- 272px wide, right-docked, header shows "AI" + model badge `claude-sonnet-4-6`.
- Seeded conversation (`AI_MESSAGES`):
  1. User: "can you extract the tab-open logic in App.tsx into a custom hook?"
  2. AI: explains plan to extract `useTabs`, shows a tool-call chip `str_replace_editor` → `src/modules/tabs/useTabs.ts` (status: done, green dot).
  3. User: "looks good, also add a pinTab function"
  4. AI: "Done — added `pinTab(id)` that converts a preview tab to persistent. I've also updated `TabBar` to call it on double-click."
- Typing a message and hitting Enter (no shift) appends it as a user bubble, clears input, then after 600ms appends an AI "Working on it…" bubble with an animated 3-dot bounce indicator (not a real completion — it never resolves further).
- Footer hint: `@ files · # snippets · /commands`.

### 8.8 Status bar
- Left: `main` branch (GitBranch icon, blue) + current path (`~/nexis` or `~/nexis/src/{app|styles}/{file}` when an editor tab is active).
- Right: `● 0 errors` (green dot) + `claude-sonnet-4-6` pill (purple, Sparkles icon).
- Thin gradient top border (transparent → border-color → transparent).

## 9. Integration points elsewhere in the site (minimal-design branch)

- `src/App.jsx` — `isNexis = hash === '#nexis'`; renders `<Nexis />` inside a `motion.div key="nexis"` using shared `subpageProps` transition; also has a nav link `href="#nexis"` at line 344.
- `src/components/CommandPalette.jsx` — command palette entry: `{ id: 'nexis', label: 'Nexis', icon: Terminal, hash: '#nexis' }`.
- `src/components/Hero.jsx` — mentions "Nexis" (project listing) and links to `https://github.com/rwetz/Nexis`.
- `src/components/Projects.jsx` — project card for Nexis includes an extra icon-link (`Terminal` icon) to `#nexis` alongside the normal GitHub icon link, shown only `if (project.title === 'Nexis')`.

## 10. Assets

| Asset | Source path (minimal-design branch) | Used for |
|---|---|---|
| `logo (1) (1).png` | `src/assets/logo (1) (1).png` | Nexis app icon (`NexisLogo`), used in nav and hero, 22% border-radius |
| `signature.png` | `src/assets/signature.png` | Site signature mark in Nexis page nav, links to `#hero` |
| `nexis/welcome.png` | `src/assets/nexis/welcome.png` | Screenshot showcase — Welcome screen |
| `nexis/editor.png` | `src/assets/nexis/editor.png` | Screenshot showcase — Code editor |
| `nexis/ai.png` | `src/assets/nexis/ai.png` | Screenshot showcase — AI agent |
| `nexis/terminal.png` | `src/assets/nexis/terminal.png` | Screenshot showcase — Terminal |
| `nexis/markdown.png` | `src/assets/nexis/markdown.png` | Screenshot showcase — Markdown viewer |
| `nexis/features.png` | `src/assets/nexis/features.png` | Screenshot showcase — Feature browser |
| `nexis/settings.png` | `src/assets/nexis/settings.png` | Screenshot showcase — Settings |
| `nexis/shortcuts.png` | `src/assets/nexis/shortcuts.png` | Screenshot showcase — Keyboard shortcuts |

All 8 `nexis/*.png` screenshots have been copied into `nexis-site-assets/` in this repo for convenience.

## 11. Icons used (lucide-react)

ChevronRight, Download, ExternalLink, Star, Terminal, FileCode2, Bot, Palette, PanelLeft, LayoutGrid, Settings, Keyboard, Search, Folder, Clock3, GitBranch, Cpu, Network, Layers, TerminalSquare, AlignLeft, Code2, FlaskConical, Database, Hammer, GitPullRequest, Wand2, Globe, Zap, Bookmark, StickyNote, ScrollText, Server, Rocket, History, FolderOpen, File, ChevronDown, Plus, X, ShieldOff, SendHorizonal, Sparkles.

## 12. Motion/animation conventions

- Standard `fadeUp(delay)` helper: `initial: {opacity:0, y:20}`, `whileInView: {opacity:1, y:0}`, `viewport: {once:true, margin:'-60px'}`, `transition: {duration:0.55, ease:'easeOut', delay}`.
- Feature cards / screenshots stagger in with `delay: i * 0.08`.
- Shortcuts list items slide in from the left (`x:-12 → 0`), staggered `delay: i * 0.05`.
- Panel pills scale in (`scale:0.92 → 1`), staggered `delay: i * 0.03`.
- Page background uses a recurring `dot-grid` class (light sections) and a `radial-gradient` dot pattern inline style (feature/screenshot sections) for texture.
