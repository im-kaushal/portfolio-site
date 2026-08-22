import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav, site } from "../content/site";
import { useTheme } from "../lib/theme";

type Item = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toggle } = useTheme();

  const items = useMemo<Item[]>(() => {
    const jumps: Item[] = nav.map((n) => ({
      id: n.id,
      label: `Go to ${n.label}`,
      hint: n.href,
      run: () => {
        navigate("/");
        requestAnimationFrame(() => {
          document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" });
        });
      },
    }));
    return [
      ...jumps,
      {
        id: "live-desk",
        label: "Open synthetic desk",
        hint: "mTrust demo",
        run: () => {
          navigate("/");
          requestAnimationFrame(() => {
            document.getElementById("live-desk")?.scrollIntoView({ behavior: "smooth" });
          });
        },
      },
      {
        id: "book",
        label: site.bookCall.label,
        hint: site.bookCall.hint,
        run: () => window.open(site.bookCall.href, "_blank", "noopener,noreferrer"),
      },
      {
        id: "email",
        label: "Copy email",
        hint: site.publicEmail,
        run: () => void navigator.clipboard.writeText(site.publicEmail),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "im-kaushal",
        run: () => window.open(site.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "im-kaushal",
        run: () => window.open(site.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        run: () => {
          const a = document.createElement("a");
          a.href = site.resumeHref;
          a.download = "Kaushal_Kumar_Resume.pdf";
          a.click();
        },
      },
      {
        id: "theme",
        label: "Toggle theme",
        hint: "night / day",
        run: toggle,
      },
    ];
  }, [navigate, toggle]);

  const filtered = items.filter((item) =>
    `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function run(item: Item) {
    item.run();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/70 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-lg border border-amber/40 bg-ink-2 shadow-hud">
        <label className="sr-only" htmlFor="cmdk">
          Command
        </label>
        <input
          id="cmdk"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(i + 1, filtered.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter" && filtered[active]) run(filtered[active]);
          }}
          placeholder="Jump, copy, open…"
          className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-steel"
        />
        <ul className="max-h-80 overflow-auto py-2" role="listbox">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 font-mono text-xs text-steel">No matches</li>
          ) : (
            filtered.map((item, i) => (
              <li key={item.id} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(item)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left font-mono text-sm ${
                    i === active ? "bg-ink-3 text-amber" : "text-paper"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] text-steel">{item.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-steel">
          Esc to close · ↑↓ to move · enter to run
        </p>
      </div>
    </div>
  );
}
