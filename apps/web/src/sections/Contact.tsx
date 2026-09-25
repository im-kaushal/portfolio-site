import { FormEvent, useState } from "react";
import { site } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { copyToClipboard } from "../lib/clipboard";

const channels = [
  { href: `mailto:${site.publicEmail}`, label: "Email", hint: site.publicEmail, icon: "✉️" },
  { href: site.bookCall.href, label: "WhatsApp", hint: "+91 7970513448", icon: "💬" },
  { href: site.linkedin, label: "LinkedIn", hint: "in/im-kaushal", icon: "💼" },
  { href: site.github, label: "GitHub", hint: "im-kaushal", icon: "🐙" },
  { href: `tel:${site.phoneTel}`, label: "Phone", hint: site.phoneDisplay, icon: "📞" },
];

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(site.publicEmail);
    if (success) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || message.length < 10) {
      setStatus("error");
      setError("Please fill in your name, email, and a message (minimum 10 characters).");
      return;
    }

    const payload = {
      name,
      email,
      message,
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
      setError(err instanceof Error ? err.message : "Could not send. Please email me directly.");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Get In Touch
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Let&apos;s connect
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Open to frontend, mobile, and full-stack engineering opportunities. If you have an open role, an engineering challenge, or just want to chat about web performance, feel free to reach out.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Direct Channels */}
        <div className="space-y-4">
          <CardSpotlight className="p-6 sm:p-7">
            <h3 className="text-base font-semibold text-paper">Direct Channels</h3>
            <p className="mt-1 text-xs text-steel">Instant ways to reach me directly</p>

            <div className="mt-5 space-y-2.5">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  onClick={
                    c.label === "Email"
                      ? () => {
                          void handleCopyEmail();
                        }
                      : undefined
                  }
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between rounded-xl border border-line/60 bg-ink-2/60 px-4 py-3 text-xs text-paper hover:border-line hover:bg-ink-3/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base" aria-hidden="true">{c.icon}</span>
                    <span className="font-medium text-paper group-hover:text-amber transition-colors">
                      {c.label}
                    </span>
                  </div>
                  <span className="font-mono text-steel group-hover:text-paper text-[11px] truncate max-w-[180px]">
                    {c.hint}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-line/60 flex items-center justify-between text-xs">
              <span className="text-steel">Quick Email Copy:</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="rounded-lg border border-line bg-ink-3 px-3 py-1.5 font-mono text-[11px] text-paper hover:border-amber transition-colors"
              >
                {copiedEmail ? "✓ Copied to clipboard" : site.publicEmail}
              </button>
            </div>
          </CardSpotlight>

          {/* Quick Context Card */}
          <div className="rounded-2xl border border-line/60 bg-ink-2/40 p-5 text-xs text-steel space-y-2">
            <div className="flex items-center gap-2 text-paper font-medium">
              <span className="h-2 w-2 rounded-full bg-phosphor" />
              <span>Location: Open to relocate anywhere</span>
            </div>
            <p>
              Available for on-site, hybrid, or remote roles worldwide. Open to domestic & international relocation.
            </p>
          </div>
        </div>

        {/* Message Form Card */}
        <CardSpotlight className="p-6 sm:p-7">
          <h3 className="text-base font-semibold text-paper">Send a Note</h3>
          <p className="mt-1 text-xs text-steel">Directly delivers to my inbox</p>

          <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-steel">
                Your Name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                minLength={2}
                maxLength={80}
                placeholder="e.g. Priya Sharma"
                className="mt-1.5 w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder-steel/60 outline-none focus:border-amber transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-steel">
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="e.g. priya@company.com"
                className="mt-1.5 w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder-steel/60 outline-none focus:border-amber transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-steel">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={5}
                placeholder="Role details, project requirements, or questions..."
                className="mt-1.5 w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder-steel/60 outline-none focus:border-amber transition-colors"
              />
            </div>

            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto rounded-xl bg-amber px-6 py-3 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>

            {status === "ok" && (
              <div
                role="status"
                className="rounded-xl border border-phosphor/40 bg-phosphor/10 p-3.5 text-xs text-phosphor space-y-1"
              >
                <p className="font-semibold">✓ Message delivered successfully.</p>
                <p className="text-steel">Thank you for getting in touch. I will reply shortly.</p>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="rounded-xl border border-amber/40 bg-amber/10 p-3 text-xs text-amber font-medium"
              >
                {error}
              </div>
            )}
          </form>
        </CardSpotlight>
      </div>
    </section>
  );
}
