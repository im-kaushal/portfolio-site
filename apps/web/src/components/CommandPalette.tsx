import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "../content/site";
import { useTheme } from "../lib/theme";
import { downloadResume } from "../lib/downloadResume";
import { copyToClipboard } from "../lib/clipboard";

type Item = {
  id: string;
  category: "Navigation" | "Actions" | "Connect";
  label: string;
  hint: string;
  icon?: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const { toggle, theme } = useTheme();

  const items = useMemo<Item[]>(() => {
    const jumps: Item[] = nav.map((n) => ({
      id: `jump-${n.id}`,
      category: "Navigation",
      label: `Jump to ${n.label}`,
      hint: n.href,
      icon: "↗",
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
        id: "action-resume",
        category: "Actions",
        label: "Download Resume (PDF)",
        hint: "Latest 2026 version",
        icon: "📄",
        run: () => downloadResume("Kaushal_Kumar_Resume.pdf"),
      },
      {
        id: "action-theme",
        category: "Actions",
        label: `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`,
        hint: "Toggle theme",
        icon: theme === "dark" ? "☀️" : "🌙",
        run: toggle,
      },
      {
        id: "action-email",
        category: "Actions",
        label: "Copy Email Address",
        hint: site.publicEmail,
        icon: "📋",
        run: () => void copyToClipboard(site.publicEmail),
      },
      {
        id: "connect-whatsapp",
        category: "Connect",
        label: "Chat on WhatsApp",
        hint: site.phoneDisplay,
        icon: "💬",
        run: () => window.open(site.whatsapp, "_blank", "noopener,noreferrer"),
      },
      {
        id: "connect-linkedin",
        category: "Connect",
        label: "View LinkedIn Profile",
        hint: "in/im-kaushal",
        icon: "💼",
        run: () => window.open(site.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "connect-github",
        category: "Connect",
        label: "View GitHub Profile",
        hint: "@im-kaushal",
        icon: "🐙",
        run: () => window.open(site.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "connect-huntai",
        category: "Connect",
        label: "View HuntAI Live Project",
        hint: "huntai-kappa.vercel.app",
        icon: "🚀",
        run: () => window.open("https://huntai-kappa.vercel.app", "_blank", "noopener,noreferrer"),
      },
    ];
  }, [navigate, toggle, theme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Keep active option in view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>("[aria-selected='true']");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [active]);

  function run(item: Item) {
    item.run();
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 p-4 pt-[10vh] sm:pt-[14vh] backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line/80 bg-ink-2/95 shadow-2xl backdrop-blur-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-line/80 px-4 py-3.5">
              <svg
                className="h-4 w-4 text-steel shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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
                  if (e.key === "Enter" && filtered[active]) {
                    e.preventDefault();
                    run(filtered[active]);
                  }
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-steel"
              />
              <kbd className="hidden sm:inline-block rounded border border-line bg-ink px-1.5 py-0.5 text-[10px] font-mono text-steel">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <ul
              ref={listRef}
              data-lenis-prevent
              className="max-h-80 overflow-y-auto p-2"
              role="listbox"
            >
              {filtered.length === 0 ? (
                <li className="p-8 text-center text-xs text-steel">
                  No commands or links found matching &ldquo;{query}&rdquo;
                </li>
              ) : (
                filtered.map((item, i) => {
                  const isSelected = i === active;
                  return (
                    <li key={item.id} role="option" aria-selected={isSelected}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => run(item)}
                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-amber text-white"
                            : "text-paper hover:bg-ink-3/70"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-sm select-none" aria-hidden="true">
                            {item.icon || "•"}
                          </span>
                          <span className="font-medium truncate">{item.label}</span>
                        </div>
                        <span
                          className={`text-[11px] truncate font-mono ml-3 ${
                            isSelected ? "text-white/80" : "text-steel"
                          }`}
                        >
                          {item.hint}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>

            {/* Footer Guide */}
            <div className="flex items-center justify-between border-t border-line/60 bg-ink-3/40 px-4 py-2 text-[11px] text-steel">
              <div className="flex items-center gap-3">
                <span>Navigate <strong className="font-mono text-paper">↑↓</strong></span>
                <span>Select <strong className="font-mono text-paper">↵</strong></span>
              </div>
              <span>Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
