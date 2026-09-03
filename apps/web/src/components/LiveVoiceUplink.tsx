import { useEffect, useRef, useState } from "react";
import { float32ToPcm16Base64, pcm16Base64ToFloat32 } from "../lib/audio";

interface TranscriptMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
}

interface LiveVoiceUplinkProps {
  onInsertMessage?: (messageText: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function LiveVoiceUplink({
  onInsertMessage,
  isOpen,
  onToggle,
}: LiveVoiceUplinkProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Standby — Live API Ready");
  const [transcripts, setTranscripts] = useState<TranscriptMessage[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  // Audio Contexts & WebSocket Refs
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isMutedRef = useRef(false);

  isMutedRef.current = isMuted;

  // Cleanup on unmount or toggle
  useEffect(() => {
    return () => {
      disconnectLive();
    };
  }, []);

  // Visualizer loop for active voice feedback
  useEffect(() => {
    if (!isConnected) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      phase += 0.05;

      ctx.fillStyle = "rgba(10, 14, 18, 0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const amplitude = agentSpeaking ? 22 : userSpeaking ? 16 : 4;
      const color = agentSpeaking ? "#00ff66" : userSpeaking ? "#ffb000" : "#4a5568";

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + Math.sin(x * 0.04 + phase) * amplitude * Math.sin(x / canvas.width * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isConnected, agentSpeaking, userSpeaking]);

  function stopAllQueuedAudio() {
    audioSourcesQueueRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        // ignore
      }
    });
    audioSourcesQueueRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
    setAgentSpeaking(false);
  }

  function playAudioChunk(audioCtx: AudioContext, base64Pcm: string) {
    try {
      const float32Pcm = pcm16Base64ToFloat32(base64Pcm);
      const audioBuffer = audioCtx.createBuffer(1, float32Pcm.length, 24000);
      audioBuffer.getChannelData(0).set(float32Pcm);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);

      const currentTime = audioCtx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
      audioSourcesQueueRef.current.push(source);

      setAgentSpeaking(true);

      source.onended = () => {
        const index = audioSourcesQueueRef.current.indexOf(source);
        if (index !== -1) {
          audioSourcesQueueRef.current.splice(index, 1);
        }
        if (audioSourcesQueueRef.current.length === 0) {
          setAgentSpeaking(false);
        }
      };
    } catch (e) {
      console.error("Audio playback chunk error:", e);
    }
  }

  async function connectLive() {
    setIsConnecting(true);
    setStatusMessage("Acquiring audio stream & connecting to Live API...");

    try {
      // 1. Audio stream capture (16kHz for Gemini input)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const inputCtx = new AudioCtx({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputCtx;

      // Output context (24kHz for Gemini Live output)
      const outputCtx = new AudioCtx({ sampleRate: 24000 });
      outputAudioCtxRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // 2. Connect to WebSocket proxy
      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${proto}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnecting(false);
        setIsConnected(true);
        setStatusMessage("Live API connected · Model: gemini-3.1-flash-live-preview");

        // Set up audio input processor
        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        scriptProcessorRef.current = processor;

        source.connect(processor);
        processor.connect(inputCtx.destination);

        processor.onaudioprocess = (e) => {
          if (isMutedRef.current || ws.readyState !== WebSocket.OPEN) return;

          const channelData = e.inputBuffer.getChannelData(0);

          // Detect if user is speaking based on RMS
          let sum = 0;
          for (let i = 0; i < channelData.length; i++) {
            sum += channelData[i] * channelData[i];
          }
          const rms = Math.sqrt(sum / channelData.length);
          setUserSpeaking(rms > 0.02);

          const base64 = float32ToPcm16Base64(channelData);
          ws.send(JSON.stringify({ audio: base64 }));
        };
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.interrupted) {
            stopAllQueuedAudio();
          }

          if (msg.audio && outputAudioCtxRef.current) {
            playAudioChunk(outputAudioCtxRef.current, msg.audio);
          }

          if (msg.text) {
            setTranscripts((prev) => [
              ...prev,
              {
                id: Math.random().toString(36).substring(2),
                sender: "agent",
                text: msg.text,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
              },
            ]);
          }

          if (msg.userText) {
            setTranscripts((prev) => [
              ...prev,
              {
                id: Math.random().toString(36).substring(2),
                sender: "user",
                text: msg.userText,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
              },
            ]);
          }

          if (msg.status) {
            setStatusMessage(msg.status);
          }
        } catch (e) {
          console.error("WS message parse error:", e);
        }
      };

      ws.onerror = () => {
        setStatusMessage("Connection notice: WebSocket live streaming unavailable. Switching to assisted mode.");
      };

      ws.onclose = () => {
        disconnectLive();
      };
    } catch (err) {
      console.error("Live connection failure:", err);
      setIsConnecting(false);
      setIsConnected(false);
      setStatusMessage(
        err instanceof Error
          ? `Connection failed: ${err.message}`
          : "Microphone or network connection error."
      );
    }
  }

  function disconnectLive() {
    stopAllQueuedAudio();

    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {
        // ignore
      }
      wsRef.current = null;
    }

    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (inputAudioCtxRef.current && inputAudioCtxRef.current.state !== "closed") {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current && outputAudioCtxRef.current.state !== "closed") {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setAgentSpeaking(false);
    setUserSpeaking(false);
    setStatusMessage("Uplink disconnected · Ready to connect");
  }

  function handleUseTranscript() {
    if (!onInsertMessage) return;
    const summary = transcripts
      .map((t) => `${t.sender === "user" ? "Client" : "Kaushal AI"}: ${t.text}`)
      .join("\n\n");
    if (summary) {
      onInsertMessage(summary);
    }
  }

  return (
    <div className="border border-line bg-ink-2/95 shadow-hud">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-line/70 px-4 py-3 bg-ink/90">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              isConnected
                ? "bg-phosphor animate-pulse"
                : isConnecting
                ? "bg-amber animate-ping"
                : "bg-steel/40"
            }`}
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-paper">
                Live Voice Uplink
              </h4>
              <span className="border border-amber/50 bg-amber/10 px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider text-amber">
                gemini-3.1-flash-live-preview
              </span>
            </div>
            <p className="font-mono text-[10px] text-steel">{statusMessage}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggle}
            className="font-mono text-xs uppercase tracking-widest text-steel hover:text-amber transition-colors px-2 py-1"
          >
            {isOpen ? "Hide [−]" : "Expand [+]"}
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      {isOpen && (
        <div className="p-4 space-y-4">
          {/* Audio Visualizer & Wave */}
          <div className="relative h-20 w-full overflow-hidden border border-line bg-ink">
            <canvas
              ref={canvasRef}
              width={600}
              height={80}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute left-3 top-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
              <span className={agentSpeaking ? "text-phosphor font-bold" : "text-steel"}>
                AI VOICE: {agentSpeaking ? "TRANSMITTING 24kHz" : "IDLE"}
              </span>
              <span>·</span>
              <span className={userSpeaking ? "text-amber font-bold" : "text-steel"}>
                MIC: {userSpeaking ? "INPUT DETECTED" : isMuted ? "MUTED" : "LISTENING 16kHz"}
              </span>
            </div>
          </div>

          {/* Transcript Log */}
          <div className="max-h-40 min-h-24 overflow-y-auto border border-line/60 bg-ink/60 p-3 font-mono text-xs space-y-2">
            {transcripts.length === 0 ? (
              <p className="text-steel/70 italic text-center py-4">
                No active voice transmission yet. Click &quot;Initialize Live Uplink&quot; to speak directly with Kaushal&apos;s AI representative.
              </p>
            ) : (
              transcripts.map((t) => (
                <div key={t.id} className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-[10px] text-steel">
                    <span className={t.sender === "agent" ? "text-phosphor uppercase" : "text-amber uppercase"}>
                      [{t.sender === "agent" ? "KAUSHAL AI" : "YOU"}]
                    </span>
                    <span>{t.timestamp}</span>
                  </div>
                  <p className="text-paper pl-2 border-l border-line/40">{t.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {!isConnected ? (
                <button
                  type="button"
                  onClick={connectLive}
                  disabled={isConnecting}
                  className="border border-amber bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink hover:bg-transparent hover:text-amber transition-colors disabled:opacity-60"
                >
                  {isConnecting ? "Connecting…" : "Initialize Live Uplink"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={disconnectLive}
                    className="border border-red-500 bg-red-500/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Disconnect
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-widest text-steel hover:text-paper transition-colors"
                  >
                    {isMuted ? "Unmute Mic" : "Mute Mic"}
                  </button>
                </>
              )}
            </div>

            {transcripts.length > 0 && onInsertMessage ? (
              <button
                type="button"
                onClick={handleUseTranscript}
                className="border border-phosphor bg-phosphor/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-phosphor hover:bg-phosphor hover:text-ink transition-colors"
              >
                Copy Transcript into Message ↗
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
