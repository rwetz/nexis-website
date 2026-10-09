
import { PANELS, SHORTCUTS } from "@/lib/content";

export function ShortcutsPanels() {
  return (
    <section
      id="shortcuts"
      className="dot-grid-dark border-b border-black/40 bg-shell text-white"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-5 py-20 sm:px-8 sm:py-[80px] lg:grid-cols-2 lg:gap-20">
        {/* Keyboard shortcuts */}
        <div>
          <p className="caption-label text-white/45">
            Muscle memory
          </p>
          <h2 className="display-lg mt-3 text-white">
            Keyboard-first.
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Every core action is a keystroke away. Remap any of them from a
            searchable shortcuts panel.
          </p>

          <ul className="mt-8 divide-y divide-white/10">
            {SHORTCUTS.map((s) => (
              <li
                key={s.action}
                className="flex items-center justify-between py-3"
              >
                <span className="text-[15px] text-white/85">{s.action}</span>
                <span className="flex items-center gap-1">
                  {s.keys.map((k) => (
                    <kbd
                      key={k}
                      className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-xs text-white/80"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar panels */}
        <div>
          <p className="caption-label text-white/45">
            Everything a click away
          </p>
          <h2 className="display-lg mt-3 text-white">
            Packs, not clutter.
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Seven presets and ten feature packs tune the surface without
            installing or removing code. Every tool remains a click away when
            its pack is enabled.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {PANELS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-sm text-white/75 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
