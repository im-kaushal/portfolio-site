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

      <HudFrame label="STATUS" contentClassName="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
              Current Availability & Location
            </p>
            <p className="mt-1 font-serif text-xl text-paper">{site.openToWork.headline}</p>
            <p className="mt-1 text-sm text-steel">
              {site.location} · {site.openToWork.detail}
            </p>
          </div>
          <a
            href={site.bookCall.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-amber bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink hover:bg-transparent hover:text-amber transition-colors"
          >
            {site.bookCall.label}
          </a>
        </div>
      </HudFrame>

      <p className="mt-6 max-w-2xl text-justify text-base leading-relaxed text-steel">
        Have a role, a product idea, or a challenging frontend or mobile problem? Send a message — I read
        every transmission and reply promptly. You can also reach me directly at{" "}
        <a href={`mailto:${site.publicEmail}`} className="text-phosphor hover:text-amber underline">
          {site.publicEmail}
        </a>
        , schedule a short call, or connect on LinkedIn.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <HudFrame label="MSG.TX" contentClassName="p-6">
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block font-mono text-[11px] uppercase tracking-widest text-steel">
                Name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Your Name"
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 font-sans text-sm text-paper focus:border-amber focus:outline-none"
                />
              </label>
              <label className="block font-mono text-[11px] uppercase tracking-widest text-steel">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 font-sans text-sm text-paper focus:border-amber focus:outline-none"
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
                placeholder="Project brief, role details, or question..."
                className="mt-1 w-full border border-line bg-ink px-3 py-2 font-sans text-sm text-paper focus:border-amber focus:outline-none"
              />
            </label>
            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="border border-amber bg-amber px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink hover:bg-transparent hover:text-amber transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Transmitting…" : "Send message"}
              </button>
              <a
                href={site.bookCall.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-paper hover:border-phosphor hover:text-phosphor transition-colors"
              >
                {site.bookCall.label}
              </a>
            </div>
            {status === "ok" ? (
              <p role="status" className="font-mono text-sm text-phosphor">
                ✓ Transmission received. Thanks — I will reply shortly.
              </p>
            ) : null}
            {status === "error" ? (
              <p role="alert" className="font-mono text-sm text-amber">
                {error}
              </p>
            ) : null}
          </form>
        </HudFrame>

        <HudFrame label="DIRECT.CHANNELS" contentClassName="p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-phosphor mb-4">
              Direct Uplink Directory
            </h3>
            <div className="space-y-2.5">
              {actions.map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  target={a.href.startsWith("http") ? "_blank" : undefined}
                  rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between border border-line/70 bg-ink/50 px-4 py-3 font-mono text-sm text-paper hover:border-amber hover:bg-ink hover:text-amber transition-all"
                >
                  <span className="font-medium">{a.label}</span>
                  <span className="text-xs text-steel">{a.hint}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-line/60 pt-4 font-mono text-[11px] text-steel">
            <p>Based in: Bengaluru, Karnataka · Open to Remote & Relocation</p>
            <p className="mt-1 text-phosphor">Timezone: IST (UTC+05:30)</p>
          </div>
        </HudFrame>
      </div>
    </section>
  );
}
