import { FormEvent, useState } from "react";
import { site } from "../content/site";
import { HudFrame } from "../components/HudFrame";
import { VoiceRecorder, type AudioRecording } from "../components/VoiceRecorder";
import { LiveVoiceUplink } from "../components/LiveVoiceUplink";

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
  const [messageText, setMessageText] = useState("");
  const [activeRecording, setActiveRecording] = useState<AudioRecording | null>(null);
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [showLiveUplink, setShowLiveUplink] = useState(false);

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
    if (activeRecording && message.length < 20) {
      message = activeRecording.transcript
        ? `[Voice Memo Transmission (${Math.round(activeRecording.duration)}s)]: ${activeRecording.transcript}`
        : `[Voice Memo Transmission Attached (${Math.round(activeRecording.duration)}s duration)]`;
    }

    if (!message || message.length < 5) {
      setStatus("error");
      setError("Please enter a message or record a voice memo before sending.");
      return;
    }

    const payload = {
      name,
      email,
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

      setStatus("ok");
      setMessageText("");
      setActiveRecording(null);
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send. Use email or WhatsApp.");
    }
  }

  function handleVoiceRecordingComplete(rec: AudioRecording) {
    setActiveRecording(rec);
    if (rec.transcript && !messageText) {
      setMessageText(rec.transcript);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Uplink</p>
          <h2 className="mt-2 font-serif text-4xl text-paper">Contact & Voice Uplink</h2>
        </div>

        {/* Live Voice Uplink Toggle Button */}
        <button
          type="button"
          onClick={() => setShowLiveUplink((prev) => !prev)}
          className="flex items-center gap-2 border border-phosphor/60 bg-phosphor/10 px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-phosphor hover:bg-phosphor hover:text-ink transition-colors"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-phosphor animate-ping" />
          <span>{showLiveUplink ? "Close Live Voice" : "🎙 Live Voice AI (Gemini 3.1 Flash)"}</span>
        </button>
      </div>

      <HudFrame label="STATUS" contentClassName="p-5 mt-6">
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

      {/* Real-time Voice Conversations Module (Gemini 3.1 Flash Live Preview) */}
      {showLiveUplink && (
        <div className="mt-6">
          <HudFrame label="AUDIO.SPARK · LIVE VOICE CONVERSATION">
            <LiveVoiceUplink
              isOpen={showLiveUplink}
              onToggle={() => setShowLiveUplink((prev) => !prev)}
              onInsertMessage={(text) => {
                setMessageText((prev) => (prev ? `${prev}\n\n${text}` : text));
              }}
            />
          </HudFrame>
        </div>
      )}

      <p className="mt-6 max-w-2xl text-justify text-base leading-relaxed text-steel">
        Have a role, a product idea, or a challenging frontend or mobile problem? Send a transmission or record a voice note directly below. You can also reach me directly at{" "}
        <a href={`mailto:${site.publicEmail}`} className="text-phosphor hover:text-amber underline">
          {site.publicEmail}
        </a>
        , schedule a short call, or connect on LinkedIn.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <HudFrame label="MSG.TX" contentClassName="p-6">
          <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
              Transmission Method:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className={`font-mono text-xs px-2.5 py-1 uppercase tracking-wider transition-colors ${
                  inputMode === "text"
                    ? "border border-amber text-amber bg-amber/10"
                    : "text-steel hover:text-paper"
                }`}
              >
                Text
              </button>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className={`flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 uppercase tracking-wider transition-colors ${
                  inputMode === "voice"
                    ? "border border-phosphor text-phosphor bg-phosphor/10"
                    : "text-steel hover:text-paper"
                }`}
              >
                <span>🎙 Voice Memo</span>
                {activeRecording && <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />}
              </button>
            </div>
          </div>

          {/* Voice Memo Recorder Box */}
          {inputMode === "voice" && (
            <div className="mb-4">
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
            <div className="mb-4 flex items-center justify-between border border-phosphor/50 bg-phosphor/10 px-3 py-2 font-mono text-xs text-phosphor">
              <div className="flex items-center gap-2">
                <span>🎙 Voice Memo Attached</span>
                <span className="text-steel">({Math.round(activeRecording.duration)}s)</span>
              </div>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className="text-[10px] uppercase tracking-wider underline text-paper hover:text-amber"
              >
                Review Audio
              </button>
            </div>
          )}

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
              Message {activeRecording && <span className="text-phosphor">(Voice Transcribed)</span>}
              <textarea
                name="message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required={!activeRecording}
                minLength={activeRecording ? 0 : 20}
                maxLength={4000}
                rows={5}
                placeholder={
                  activeRecording
                    ? "Your voice transcript will appear here. You can freely edit or augment it..."
                    : "Project brief, role details, or question..."
                }
                className="mt-1 w-full border border-line bg-ink px-3 py-2 font-sans text-sm text-paper focus:border-amber focus:outline-none"
              />
            </label>

            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="border border-amber bg-amber px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink hover:bg-transparent hover:text-amber transition-colors disabled:opacity-60"
              >
                {status === "sending"
                  ? "Transmitting…"
                  : activeRecording
                  ? "Transmit Voice Note & Message"
                  : "Send message"}
              </button>

              <button
                type="button"
                onClick={() => setInputMode((prev) => (prev === "voice" ? "text" : "voice"))}
                className="border border-line px-3.5 py-2.5 font-mono text-xs uppercase tracking-widest text-steel hover:border-phosphor hover:text-phosphor transition-colors flex items-center gap-1.5"
              >
                <span>🎙</span>
                <span>{inputMode === "voice" ? "Hide Mic" : "Record Voice"}</span>
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
              <div role="status" className="border border-phosphor/50 bg-phosphor/10 p-3 font-mono text-sm text-phosphor space-y-1">
                <p>✓ Transmission received successfully.</p>
                <p className="text-xs text-steel">
                  {activeRecording
                    ? "Voice memo & message logged. Kaushal will reply shortly."
                    : "Thanks — I will reply promptly."}
                </p>
              </div>
            ) : null}

            {status === "error" ? (
              <p role="alert" className="border border-amber/50 bg-amber/10 p-2.5 font-mono text-sm text-amber">
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
