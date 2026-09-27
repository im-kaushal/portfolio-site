import { FormEvent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { copyToClipboard } from "../lib/clipboard";
import { playChime } from "../lib/audio";
import { downloadResume } from "../lib/downloadResume";
import { VoiceRecorder, type AudioRecording } from "../components/VoiceRecorder";
import { Magnetic } from "../components/ui/Magnetic";
import { ScrollReveal } from "../components/ui/ScrollReveal";

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [topic, setTopic] = useState("role");
  const [activeRecording, setActiveRecording] = useState<AudioRecording | null>(null);
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");

  // Automatically hide the success message after 5 seconds
  useEffect(() => {
    if (status === "ok") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleCopy = async (value: string, key: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      playChime();
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
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
    let message = messageText.trim() || String(data.get("message") ?? "").trim();

    // If audio is attached and message is brief or empty, provide descriptive text
    if (activeRecording && message.length < 3) {
      message = activeRecording.transcript
        ? `[Voice memo transcript: ${activeRecording.transcript}]`
        : `[Voice memo attached (${Math.round(activeRecording.duration)}s duration)]`;
    }

    if (!name || !email || (!activeRecording && message.length < 3)) {
      setStatus("error");
      setError("Please provide your name, email, and a message or record a voice note.");
      return;
    }

    const payload = {
      name,
      email,
      topic,
      message,
      website: String(data.get("website") ?? ""),
      source: window.location.pathname,
      audioData: activeRecording?.base64,
      audioDuration: activeRecording?.duration,
      transcript: activeRecording?.transcript,
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

      playChime();
      setStatus("ok");
      setMessageText("");
      setActiveRecording(null);
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send. Please email me directly.");
    }
  }

  function handleVoiceRecordingComplete(rec: AudioRecording) {
    setActiveRecording(rec);
    if (rec.transcript && !messageText) {
      setMessageText(rec.transcript);
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <ScrollReveal className="max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Frictionless Conversion Hub
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Let&apos;s Connect
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Open to senior engineering roles, technical advisory, Core Web Vitals optimization, and high-impact software craft. Choose whichever channel is easiest for you.
        </p>
      </ScrollReveal>

      {/* Contact Grid: Recruiter Fast-Track + Async Inquiry */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left Column: Recruiter Fast-Track */}
        <div className="space-y-4">
          <CardSpotlight className="p-6 sm:p-7 border-line/70 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-paper">Recruiter Fast-Track</h3>
                  <p className="mt-0.5 text-xs text-steel">Instant priority touchpoints</p>
                </div>
                <span className="rounded-full bg-phosphor/10 border border-phosphor/30 px-2 py-0.5 text-[10px] font-mono text-phosphor">
                  Active
                </span>
              </div>

              {/* Multi-Intent WhatsApp Chips */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-steel block">
                  1-Click Direct WhatsApp:
                </span>
                <div className="grid gap-2 sm:grid-cols-3">
                  <a
                    href={site.whatsappLinks.recruiter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col rounded-xl border border-line/80 bg-ink-2/80 p-3 hover:border-phosphor hover:bg-phosphor/10 transition-all group"
                  >
                    <span className="text-xs font-semibold text-paper group-hover:text-phosphor flex items-center gap-1">
                      <span>💼</span>
                      <span>Recruiter</span>
                    </span>
                    <span className="text-[10px] font-mono text-steel mt-0.5 line-clamp-1">
                      Role inquiry
                    </span>
                  </a>

                  <a
                    href={site.whatsappLinks.techChat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col rounded-xl border border-line/80 bg-ink-2/80 p-3 hover:border-amber hover:bg-amber/10 transition-all group"
                  >
                    <span className="text-xs font-semibold text-paper group-hover:text-amber flex items-center gap-1">
                      <span>⚡</span>
                      <span>Tech Chat</span>
                    </span>
                    <span className="text-[10px] font-mono text-steel mt-0.5 line-clamp-1">
                      Architecture
                    </span>
                  </a>

                  <a
                    href={site.whatsappLinks.coffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col rounded-xl border border-line/80 bg-ink-2/80 p-3 hover:border-line hover:bg-ink-3 transition-all group"
                  >
                    <span className="text-xs font-semibold text-paper group-hover:text-paper flex items-center gap-1">
                      <span>☕</span>
                      <span>Coffee</span>
                    </span>
                    <span className="text-[10px] font-mono text-steel mt-0.5 line-clamp-1">
                      Say hello
                    </span>
                  </a>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl border border-line/60 bg-ink-2/60 px-4 py-3 text-xs text-paper hover:border-line hover:bg-ink-3/80 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-base" aria-hidden="true">✉️</span>
                    <div>
                      <div className="font-medium text-paper">Direct Email</div>
                      <div className="font-mono text-steel text-[11px] select-all">{site.publicEmail}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(site.publicEmail, "email")}
                    className="ml-2 rounded-lg border border-line/70 bg-ink-3/80 px-2.5 py-1 font-mono text-[10px] text-steel hover:border-amber hover:text-amber transition-colors"
                  >
                    {copiedKey === "email" ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-line/60 bg-ink-2/60 px-4 py-3 text-xs text-paper hover:border-line hover:bg-ink-3/80 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-base" aria-hidden="true">📞</span>
                    <div>
                      <div className="font-medium text-paper">Phone / WhatsApp</div>
                      <div className="font-mono text-steel text-[11px] select-all">{site.phoneDisplay}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(site.phoneDisplay, "phone")}
                    className="ml-2 rounded-lg border border-line/70 bg-ink-3/80 px-2.5 py-1 font-mono text-[10px] text-steel hover:border-amber hover:text-amber transition-colors"
                  >
                    {copiedKey === "phone" ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-line/60 bg-ink-2/60 px-4 py-3 text-xs text-paper hover:border-line hover:bg-ink-3/80 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-base" aria-hidden="true">💼</span>
                    <div>
                      <div className="font-medium text-paper">LinkedIn Profile</div>
                      <div className="font-mono text-steel text-[11px]">in/im-kaushal</div>
                    </div>
                  </div>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 rounded-lg border border-line/70 bg-ink-3/80 px-2.5 py-1 font-mono text-[10px] text-paper hover:border-amber hover:text-amber transition-colors"
                  >
                    Open ↗
                  </a>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-line/60 bg-ink-2/60 px-4 py-3 text-xs text-paper hover:border-line hover:bg-ink-3/80 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-base" aria-hidden="true">🐙</span>
                    <div>
                      <div className="font-medium text-paper">GitHub Engineering</div>
                      <div className="font-mono text-steel text-[11px]">github.com/im-kaushal</div>
                    </div>
                  </div>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 rounded-lg border border-line/70 bg-ink-3/80 px-2.5 py-1 font-mono text-[10px] text-paper hover:border-amber hover:text-amber transition-colors"
                  >
                    Open ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Download Banner */}
            <div className="mt-6 pt-5 border-t border-line/60 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-paper">Executive Resume (PDF)</div>
                <div className="text-[11px] font-mono text-steel">Updated September 2026</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playChime();
                  downloadResume("Kaushal_Kumar_Resume.pdf");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber/40 bg-amber/10 px-3.5 py-2 text-xs font-mono font-semibold text-amber hover:bg-amber hover:text-white transition-all shadow-sm"
              >
                <span>Download PDF</span>
                <span>↓</span>
              </button>
            </div>
          </CardSpotlight>
        </div>

        {/* Right Column: Async Inquiry Form & Voice Memo */}
        <CardSpotlight className="p-6 sm:p-7 border-line/70">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-3 mb-5">
            <div>
              <h3 className="text-base font-semibold text-paper">Send a Note</h3>
              <p className="mt-0.5 text-xs text-steel">Directly reaches my primary inbox</p>
            </div>

            {/* Transmission Mode Switcher: Text vs Voice Memo */}
            <div
              role="tablist"
              aria-label="Contact transmission mode"
              className="flex items-center gap-1 rounded-xl border border-line/80 bg-ink-2/80 p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={inputMode === "text"}
                onClick={() => setInputMode("text")}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                  inputMode === "text"
                    ? "bg-amber text-white font-semibold shadow-sm"
                    : "text-steel hover:text-paper"
                }`}
              >
                Text
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inputMode === "voice"}
                onClick={() => setInputMode("voice")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                  inputMode === "voice"
                    ? "bg-phosphor/20 text-phosphor font-semibold border border-phosphor/40"
                    : "text-steel hover:text-paper"
                }`}
              >
                <span>🎙 Voice Memo</span>
                {activeRecording && <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-pulse" />}
              </button>
            </div>
          </div>

          {/* Voice Memo Recorder with Waveform Visualizer */}
          {inputMode === "voice" && (
            <div className="mb-5 overflow-hidden rounded-xl border border-line/80 bg-ink-2/90">
              <VoiceRecorder
                initialRecording={activeRecording}
                onRecordingComplete={handleVoiceRecordingComplete}
                onTranscriptUpdate={(text: string) => {
                  if (!messageText) setMessageText(text);
                }}
                onClear={() => {
                  setActiveRecording(null);
                }}
              />
            </div>
          )}

          {/* Attached Audio Notification Pill */}
          {activeRecording && inputMode === "text" && (
            <div className="mb-4 flex items-center justify-between rounded-xl border border-phosphor/40 bg-phosphor/10 px-4 py-2.5 font-mono text-xs text-phosphor">
              <div className="flex items-center gap-2">
                <span>🎙 Voice Memo Attached</span>
                <span className="text-steel">({Math.round(activeRecording.duration)}s)</span>
              </div>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className="text-[11px] uppercase tracking-wider underline text-paper hover:text-amber"
              >
                Review Audio
              </button>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
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
              <label htmlFor="contact-topic" className="block text-xs font-medium text-steel">
                Topic
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2.5 text-sm text-paper outline-none focus:border-amber transition-colors"
              >
                <option value="role">Senior Engineering Role / Opportunity</option>
                <option value="advisory">Technical Advisory / Consultation</option>
                <option value="tech">Architecture & Engineering Discussion</option>
                <option value="other">General Inquiries / Say Hello</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="contact-message" className="block text-xs font-medium text-steel">
                  Message {activeRecording && <span className="text-phosphor">(Voice Transcribed)</span>}
                </label>
                {activeRecording && (
                  <span className="font-mono text-[10px] text-phosphor">
                    🎙 Audio Attached ({Math.round(activeRecording.duration)}s)
                  </span>
                )}
              </div>
              <textarea
                id="contact-message"
                name="message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required={!activeRecording}
                minLength={activeRecording ? 0 : 3}
                maxLength={4000}
                rows={4}
                placeholder={
                  activeRecording
                    ? "Your voice transcript will appear here. You can freely edit or augment it..."
                    : "Role scope, engineering project, or any questions..."
                }
                className="mt-1.5 w-full rounded-xl border border-line/80 bg-ink-2 px-3.5 py-2.5 text-sm text-paper placeholder-steel/60 outline-none focus:border-amber transition-colors"
              />
            </div>

            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2} className="w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto rounded-xl bg-amber px-6 py-3 text-xs font-semibold text-white shadow-glow hover:bg-amber-dim transition-all disabled:opacity-50"
                >
                  {status === "sending"
                    ? "Transmitting…"
                    : activeRecording
                    ? "Transmit Voice Note & Message"
                    : "Send Message →"}
                </button>
              </Magnetic>

              <button
                type="button"
                onClick={() => setInputMode((prev) => (prev === "voice" ? "text" : "voice"))}
                className="rounded-xl border border-line/80 bg-ink-2/60 px-4 py-3 font-mono text-xs uppercase tracking-wider text-steel hover:border-phosphor hover:text-phosphor transition-colors flex items-center gap-1.5"
              >
                <span>🎙</span>
                <span>{inputMode === "voice" ? "Hide Mic" : "Record Voice Note"}</span>
              </button>
            </div>

            <AnimatePresence>
              {status === "ok" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  role="status"
                  className="rounded-xl border border-phosphor/40 bg-phosphor/10 p-3.5 text-xs text-phosphor space-y-1"
                >
                  <p className="font-semibold">✓ Message delivered successfully.</p>
                  <p className="text-steel">
                    {activeRecording
                      ? "Voice memo & note logged. Kaushal will reply promptly."
                      : "Thank you for getting in touch. I will reply promptly."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

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
