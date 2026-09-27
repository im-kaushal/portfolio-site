import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blobToBase64, formatTime } from "../lib/audio";

export type AudioRecording = {
  blob: Blob;
  base64: string;
  mimeType: string;
  duration: number;
  transcript: string;
};

interface SpeechRecognitionResultItem {
  [index: number]: { transcript: string };
}

interface SpeechRecognitionEventLike {
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultItem;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEventLike) => void;
  onerror: (event: unknown) => void;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

interface VoiceRecorderProps {
  onRecordingComplete: (recording: AudioRecording) => void;
  onTranscriptUpdate?: (text: string) => void;
  onClear: () => void;
  initialRecording?: AudioRecording | null;
}

export function VoiceRecorder({
  onRecordingComplete,
  onTranscriptUpdate,
  onClear,
  initialRecording = null,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const playbackAnimFrameRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Set up initial recording if passed
  useEffect(() => {
    if (initialRecording) {
      const url = URL.createObjectURL(initialRecording.blob);
      setAudioUrl(url);
      setDuration(initialRecording.duration);
      setLiveTranscript(initialRecording.transcript);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [initialRecording]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupAudio();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  function cleanupAudio() {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (playbackAnimFrameRef.current) {
      cancelAnimationFrame(playbackAnimFrameRef.current);
      playbackAnimFrameRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }

  // Draw real-time audio visualizer oscilloscope / frequency bars
  function startVisualizer(stream: MediaStream) {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const peaks = new Float32Array(bufferLength);
      let phase = 0;

      const draw = () => {
        animFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        phase += 0.05;

        ctx.fillStyle = "rgba(10, 14, 18, 0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const val = dataArray[i];
          const barHeight = (val / 255) * (canvas.height - 6);
          peaks[i] = Math.max(barHeight, peaks[i] * 0.94);

          // Luminous gradient: Phosphor green -> Cyan -> Amber
          const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
          grad.addColorStop(0, "#34d399");
          grad.addColorStop(0.65, "#38bdf8");
          grad.addColorStop(1, val > 170 ? "#f08a72" : "#34d399");

          ctx.fillStyle = grad;
          ctx.fillRect(
            x,
            canvas.height - barHeight,
            Math.max(barWidth - 2, 2),
            barHeight
          );

          // Glowing peak hold tick
          ctx.fillStyle = peaks[i] > (canvas.height * 0.65) ? "#f08a72" : "#34d399";
          ctx.fillRect(x, Math.max(canvas.height - peaks[i] - 2, 0), Math.max(barWidth - 2, 2), 2);

          x += barWidth;
        }

        // Oscilloscope ribbon line overlay across mid-band
        ctx.beginPath();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
        ctx.lineWidth = 1.5;
        const centerY = canvas.height * 0.45;
        for (let ox = 0; ox < canvas.width; ox += 4) {
          const oy = centerY + Math.sin(ox * 0.05 + phase) * 8 * Math.sin((ox / canvas.width) * Math.PI);
          if (ox === 0) ctx.moveTo(ox, oy);
          else ctx.lineTo(ox, oy);
        }
        ctx.stroke();
      };

      draw();
    } catch (e) {
      console.warn("Visualizer init error:", e);
    }
  }

  async function startRecording() {
    setMicError(null);
    audioChunksRef.current = [];
    setLiveTranscript("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // Select supported mimeType
      let mimeType = "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        if (MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        } else {
          mimeType = "";
        }
      }

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const finalMime = recorder.mimeType || "audio/webm";
        const audioBlob = new Blob(audioChunksRef.current, { type: finalMime });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Convert to base64 for upload
        try {
          const base64 = await blobToBase64(audioBlob);
          let finalTranscript = liveTranscript.trim();

          // If speech recognition didn't catch or was unsupported, request server transcribe
          if (!finalTranscript) {
            setTranscribing(true);
            try {
              const res = await fetch("/api/transcribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  audioData: base64,
                  mimeType: finalMime,
                }),
              });
              if (res.ok) {
                const data = (await res.json()) as { transcript?: string };
                if (data.transcript) {
                  finalTranscript = data.transcript;
                  setLiveTranscript(finalTranscript);
                  onTranscriptUpdate?.(finalTranscript);
                }
              }
            } catch (err) {
              console.warn("Server transcription note:", err);
            } finally {
              setTranscribing(false);
            }
          }

          onRecordingComplete({
            blob: audioBlob,
            base64,
            mimeType: finalMime,
            duration,
            transcript: finalTranscript,
          });
        } catch (e) {
          console.error("Audio processing failed:", e);
        }
      };

      recorder.start(250); // Slice every 250ms
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);

      // Timer
      timerIntervalRef.current = window.setInterval(() => {
        setDuration((prev) => {
          if (prev >= 120) {
            // Cap at 2 minutes
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);

      // Start live visualizer
      startVisualizer(stream);

      // Attempt live Web Speech recognition for instant transcription
      const windowWithSpeech = window as unknown as {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };
      const SpeechRecognition =
        windowWithSpeech.SpeechRecognition ||
        windowWithSpeech.webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: SpeechRecognitionEventLike) => {
            let transcriptText = "";
            for (let i = 0; i < event.results.length; i++) {
              transcriptText += event.results[i][0].transcript + " ";
            }
            const clean = transcriptText.trim();
            setLiveTranscript(clean);
            onTranscriptUpdate?.(clean);
          };

          recognition.onerror = () => {
            // SpeechRecognition error is non-fatal
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch {
          // ignore if unavailable
        }
      }
    } catch (err) {
      console.error("Mic access error:", err);
      setMicError(
        err instanceof Error
          ? `Microphone access denied or unavailable: ${err.message}`
          : "Could not access microphone. Please check permissions."
      );
      cleanupAudio();
    }
  }

  function pauseRecording() {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      cleanupAudio();
    }
  }

  // Real-time canvas visualizer during playback
  useEffect(() => {
    if (!isPlaying) {
      if (playbackAnimFrameRef.current) {
        cancelAnimationFrame(playbackAnimFrameRef.current);
        playbackAnimFrameRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      playbackAnimFrameRef.current = requestAnimationFrame(render);
      phase += 0.08;

      ctx.fillStyle = "rgba(10, 14, 18, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numBars = 32;
      const barWidth = canvas.width / numBars;

      for (let i = 0; i < numBars; i++) {
        const norm = i / numBars;
        const wave = Math.sin(phase + i * 0.45) * 0.5 + 0.5;
        const barHeight = Math.max(4, (Math.sin(norm * Math.PI) * 0.55 + wave * 0.45) * (canvas.height - 8));

        const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        grad.addColorStop(0, "#34d399");
        grad.addColorStop(0.6, "#38bdf8");
        grad.addColorStop(1, "#f08a72");

        ctx.fillStyle = grad;
        ctx.fillRect(i * barWidth + 1, canvas.height - barHeight, Math.max(barWidth - 2, 2), barHeight);
      }

      // Playhead vertical scrubber line
      const playheadX = (playProgress / 100) * canvas.width;
      ctx.strokeStyle = "#f08a72";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, canvas.height);
      ctx.stroke();
    };

    render();

    return () => {
      if (playbackAnimFrameRef.current) {
        cancelAnimationFrame(playbackAnimFrameRef.current);
        playbackAnimFrameRef.current = null;
      }
    };
  }, [isPlaying, playProgress]);

  function handleDiscard() {
    cleanupAudio();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setIsRecording(false);
    setIsPaused(false);
    setDuration(0);
    setLiveTranscript("");
    setIsPlaying(false);
    onClear();
  }

  function togglePlay() {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }

  return (
    <div className="border border-line bg-ink/70 p-4 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isRecording
                ? "animate-pulse bg-red-500"
                : audioUrl
                ? "bg-phosphor"
                : "bg-steel/40"
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-widest text-paper">
            Voice Transmission
          </span>
          <span className="font-mono text-[10px] text-steel">
            {isRecording ? "RECORDING ACTIVE" : audioUrl ? "RECORDING CAPTURED" : "STANDBY"}
          </span>
        </div>

        <div className="font-mono text-xs text-amber font-semibold">
          {formatTime(duration)} / 02:00
        </div>
      </div>

      {micError ? (
        <div className="mt-3 border border-amber/50 bg-amber/10 p-2.5 font-mono text-xs text-amber">
          ⚠ {micError}
        </div>
      ) : null}

      {/* Dynamic Real-Time Audio VU Meter Canvas */}
      {(isRecording || isPlaying) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 64 }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 relative h-16 w-full overflow-hidden border border-line bg-ink-2"
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={64}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-phosphor">
            <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-pulse" />
            <span>
              {isRecording
                ? isPaused
                  ? "LIVE VU · PAUSED"
                  : "LIVE VU · 96kHz STREAM"
                : "PLAYBACK VU · SYNCHRONIZED"}
            </span>
          </div>
        </motion.div>
      )}

      {/* Recorded Audio Playback Bar */}
      {audioUrl && !isRecording ? (
        <div className="mt-3 flex flex-wrap items-center gap-3 border border-line/80 bg-ink-2/90 p-2.5">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-8 w-8 items-center justify-center border border-phosphor bg-phosphor/10 text-phosphor hover:bg-phosphor hover:text-ink transition-colors font-mono text-xs"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <div className="flex-1 min-w-[120px]">
            <div className="flex justify-between font-mono text-[10px] text-steel mb-1">
              <span>VOICE_MEMO.WAV</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="relative h-1.5 w-full bg-line overflow-hidden">
              <div
                className="h-full bg-phosphor transition-all duration-100"
                style={{ width: `${playProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleDiscard}
            className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-steel hover:border-amber hover:text-amber transition-colors"
          >
            Discard
          </button>

          <audio
            ref={audioPlayerRef}
            src={audioUrl}
            onTimeUpdate={() => {
              if (audioPlayerRef.current && audioPlayerRef.current.duration) {
                const prog =
                  (audioPlayerRef.current.currentTime / audioPlayerRef.current.duration) * 100;
                setPlayProgress(prog);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              setPlayProgress(0);
            }}
          />
        </div>
      ) : null}

      {/* Live Transcript / Speech Preview with Synchronization */}
      <AnimatePresence>
        {(liveTranscript || transcribing) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="mt-3 border border-line/50 bg-ink/40 p-2.5 font-mono text-xs text-steel"
          >
            <div className="flex items-center justify-between pb-1 border-b border-line/30 mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-amber flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                <span>{transcribing ? "Transcribing speech..." : "Live Audio Transcript"}</span>
              </span>
              {liveTranscript && (
                <span className="text-[9px] text-phosphor font-mono flex items-center gap-1">
                  <span>✓</span>
                  <span>SYNCED TO AUDIO</span>
                </span>
              )}
            </div>
            <p className="text-paper italic font-sans text-xs leading-relaxed">
              &ldquo;{liveTranscript || "Listening and synchronizing speech..."}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        {!isRecording && !audioUrl ? (
          <button
            type="button"
            onClick={startRecording}
            className="inline-flex items-center gap-2 border border-amber bg-amber/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber hover:bg-amber hover:text-ink transition-colors"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
            Record Voice Message
          </button>
        ) : null}

        {isRecording ? (
          <>
            <button
              type="button"
              onClick={stopRecording}
              className="border border-red-500 bg-red-500/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              ■ Stop Recording
            </button>
            <button
              type="button"
              onClick={pauseRecording}
              className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-widest text-steel hover:text-paper transition-colors"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </>
        ) : null}

        {audioUrl && !isRecording ? (
          <button
            type="button"
            onClick={handleDiscard}
            className="inline-flex items-center gap-1 border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-steel hover:border-amber hover:text-amber transition-colors"
          >
            ↺ Re-Record
          </button>
        ) : null}
      </div>
    </div>
  );
}
