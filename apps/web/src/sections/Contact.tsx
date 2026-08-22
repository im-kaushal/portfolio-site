import { FormEvent, useState } from "react";
import { site } from "../content/site";
import { HudFrame } from "../components/HudFrame";

const actions = [
  { href: `mailto:${site.publicEmail}`, label: "Email me", hint: site.publicEmail },
  { href: site.bookCall.href, label: site.bookCall.label, hint: site.bookCall.hint },
  { href: site.whatsapp, label: "WhatsApp", hint: "wa.me" },
  { href: site.linkedin, label: "LinkedIn", hint: "im-kaushal" },
  { href: site.github, label: "GitHub", hint: "im-kaushal" },
  { href: `tel:${site.phoneTel}`, label: "Call", hint: site.phoneDisplay },
];

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      source: window.location.pathname,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string | string[] };
        const msg = Array.isArray(body.message) ? body.message.join(" ") : body.message;
        throw new Error(msg || `Request failed (${res.status})`);
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send. Use email or WhatsApp.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Uplink</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Contact</h2>

      <HudFrame label="STATUS" className="mt-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
              Availability
            </p>
            <p className="mt-1 font-serif text-xl text-paper">{site.openToWork.headline}</p>
            <p className="mt-1 text-sm text-steel">{site.openToWork.detail}</p>
          </div>
          <a
            href={site.bookCall.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-amber bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink hover:bg-transparent hover:text-amber"
          >
            {site.bookCall.label}
          </a>
        </div>
      </HudFrame>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel">
        Have a role, a product idea, or a hard frontend problem? Send a message — I read
        everything and typically reply within one to two business days. You can also reach me
        directly at{" "}
        <a href={`mailto:${site.publicEmail}`} className="text-phosphor hover:text-amber">
          {site.publicEmail}
        </a>
        , book a short call, or use the links beside the form.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <HudFrame label="MSG.TX" className="p-5">
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block font-mono text-[11px] uppercase tracking-widest text-steel">
                Name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 font-sans text-sm text-paper"
                />
              </label>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-steel">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 font-sans text-sm text-paper"
                />
              </label>
            </div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-steel">
              Message
              <textarea
                name="message"
                required
                minLength={20}
                maxLength={4000}
                rows={6}
                className="mt-1 w-full border border-line bg-ink px-3 py-2 font-sans text-sm text-paper"
              />
            </label>
            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="border border-amber bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink disabled:opacity-60"
              >
                {status === "sending" ? "Transmitting…" : "Send message"}
              </button>
              <a
                href={site.bookCall.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper hover:border-phosphor hover:text-phosphor"
              >
                {site.bookCall.label}
              </a>
            </div>
            {status === "ok" ? (
              <p role="status" className="font-mono text-sm text-phosphor">
                Thanks — your message is on its way. I&apos;ll reply soon.
              </p>
            ) : null}
            {status === "error" ? (
              <p role="alert" className="font-mono text-sm text-amber">
                {error}
              </p>
            ) : null}
          </form>
        </HudFrame>
        <div className="space-y-3">
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              target={a.href.startsWith("http") ? "_blank" : undefined}
              rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between border border-line px-4 py-3 font-mono text-sm text-paper hover:border-amber hover:text-amber"
            >
              <span>{a.label}</span>
              <span className="text-[11px] text-steel">{a.hint}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
