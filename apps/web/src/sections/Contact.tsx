import { FormEvent, useState } from "react";
import { site } from "../content/site";
import { HudFrame } from "../components/HudFrame";

const actions = [
  { href: `mailto:${site.publicEmail}`, label: "Email me", hint: site.publicEmail },
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
      <p className="mt-3 max-w-2xl text-steel">
        Form goes through NestJS → Resend into an inbox you configure (Gmail-ready). Public address on
        this page stays {site.publicEmail}.
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
            <button
              type="submit"
              disabled={status === "sending"}
              className="border border-amber bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink disabled:opacity-60"
            >
              {status === "sending" ? "Transmitting…" : "Send message"}
            </button>
            {status === "ok" ? (
              <p role="status" className="font-mono text-sm text-phosphor">
                Received. I will reply from the configured inbox.
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
