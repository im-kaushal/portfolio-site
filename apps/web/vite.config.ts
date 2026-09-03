import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function apiPlugin(): Plugin {
  return {
    name: "api-mock-and-proxy",
    configureServer(server) {
      // Set up WebSocket server for Gemini Live API on /api/live
      if (server.httpServer) {
        import("ws").then(({ WebSocketServer, WebSocket }) => {
          const wss = new WebSocketServer({ noServer: true });

          server.httpServer?.on("upgrade", (request, socket, head) => {
            if (request.url === "/api/live" || request.url?.startsWith("/api/live?")) {
              wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit("connection", ws, request);
              });
            }
          });

          wss.on("connection", async (clientWs) => {
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              clientWs.send(
                JSON.stringify({
                  status: "Notice: GEMINI_API_KEY not configured. Standby mode active.",
                  text: "Hello! Kaushal's AI assistant is ready. Leave a voice note or message in the Contact tab.",
                }),
              );

              clientWs.on("message", () => {
                // Return acknowledgment when key is not attached
              });
              return;
            }

            try {
              const { GoogleGenAI, Modality } = await import("@google/genai");
              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: {
                    "User-Agent": "aistudio-build",
                  },
                },
              });

              const session = await ai.live.connect({
                model: "gemini-3.1-flash-live-preview",
                config: {
                  responseModalities: [Modality.AUDIO],
                  speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
                  },
                  systemInstruction:
                    "You are the autonomous voice uplink agent for Kaushal Kumar, a Senior Frontend Software Engineer at HashedIn by Deloitte. You are knowledgeable, concise, and professional. You can answer questions about Kaushal's frontend expertise (React, Angular, React Native, TypeScript, Tailwind, enterprise performance), his key projects (HuntAI, code-review-agent, pdf-bot-web, DocuBot), his open availability for high-impact roles, and you can help the caller compose a message to transmit to Kaushal.",
                  outputAudioTranscription: {},
                  inputAudioTranscription: {},
                },
                callbacks: {
                  onmessage: (rawMessage: unknown) => {
                    if (clientWs.readyState !== WebSocket.OPEN) return;

                    const message = rawMessage as {
                      serverContent?: {
                        interrupted?: boolean;
                        modelTurn?: {
                          parts?: Array<{
                            text?: string;
                            inlineData?: { data?: string };
                          }>;
                        };
                      };
                    };

                    const audio =
                      message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (audio) {
                      clientWs.send(JSON.stringify({ audio }));
                    }

                    if (message.serverContent?.interrupted) {
                      clientWs.send(JSON.stringify({ interrupted: true }));
                    }

                    const parts = message.serverContent?.modelTurn?.parts;
                    if (parts) {
                      for (const part of parts) {
                        if (part.text) {
                          clientWs.send(JSON.stringify({ text: part.text }));
                        }
                      }
                    }
                  },
                  onclose: () => {
                    if (clientWs.readyState === WebSocket.OPEN) {
                      clientWs.send(JSON.stringify({ status: "Live session concluded" }));
                    }
                  },
                  onerror: (err: unknown) => {
                    console.error("[gemini-live error]:", err);
                    if (clientWs.readyState === WebSocket.OPEN) {
                      const msg = err instanceof Error ? err.message : "Connection interrupted";
                      clientWs.send(
                        JSON.stringify({
                          status: `Live stream error: ${msg}`,
                        }),
                      );
                    }
                  },
                },
              });

              clientWs.on("message", (raw) => {
                try {
                  const data = JSON.parse(raw.toString());
                  if (data.audio) {
                    session.sendRealtimeInput({
                      audio: { data: data.audio, mimeType: "audio/pcm;rate=16000" },
                    });
                  }
                } catch {
                  // ignore malformed frame
                }
              });

              clientWs.on("close", () => {
                try {
                  session.close();
                } catch {
                  // ignore
                }
              });
            } catch (err: unknown) {
              console.error("[Live API connect failure]:", err);
              if (clientWs.readyState === WebSocket.OPEN) {
                const msg = err instanceof Error ? err.message : String(err);
                clientWs.send(
                  JSON.stringify({
                    status: `Failed to initiate Live API session: ${msg}`,
                  }),
                );
              }
            }
          });
        }).catch((err) => {
          console.warn("[ws init warning]:", err);
        });
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/health" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true, service: "kaushal-portfolio-api" }));
          return;
        }

        // Audio transcription endpoint using gemini-3.5-transcribe
        if (req.url === "/api/transcribe" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on("end", async () => {
            try {
              const data = body ? JSON.parse(body) : {};
              const { audioData, mimeType } = data;

              if (!audioData) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Missing audioData in request" }));
                return;
              }

              const apiKey = process.env.GEMINI_API_KEY;
              if (apiKey) {
                const { GoogleGenAI } = await import("@google/genai");
                const ai = new GoogleGenAI({
                  apiKey,
                  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
                });

                const response = await ai.models.generateContent({
                  model: "gemini-3.5-transcribe",
                  contents: {
                    parts: [
                      {
                        inlineData: {
                          mimeType: mimeType || "audio/webm",
                          data: audioData,
                        },
                      },
                      {
                        text: "Transcribe this voice message accurately into clear text. Do not add any preamble or commentary, only output the transcription.",
                      },
                    ],
                  },
                });

                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ transcript: response.text?.trim() || "" }));
                return;
              }

              // If no API key configured, return empty transcript gracefully
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ transcript: "" }));
            } catch (err: unknown) {
              console.error("[transcribe error]:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              const msg = err instanceof Error ? err.message : "Transcription failed";
              res.end(JSON.stringify({ error: msg }));
            }
          });
          return;
        }

        if (req.url === "/api/contact" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on("end", async () => {
            try {
              const data = body ? JSON.parse(body) : {};
              if (data.website && String(data.website).trim().length > 0) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: true, delivered: false }));
                return;
              }

              const apiKey = process.env.RESEND_API_KEY;
              const to = process.env.CONTACT_TO_EMAIL;
              const from = process.env.CONTACT_FROM_EMAIL;
              const bcc = process.env.CONTACT_BCC_EMAIL;

              const audioNoteInfo = data.audioData
                ? `\n\n[Voice Transmission Attached: ${data.audioDuration ? Math.round(data.audioDuration) + "s" : "Audio Note"}]`
                : "";

              if (!apiKey || !to || !from) {
                console.log("[contact] Received submission (mail credentials not set):", {
                  ...data,
                  audioData: data.audioData ? `[base64 audio length: ${data.audioData.length}]` : undefined,
                });
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    ok: true,
                    delivered: true,
                    hasAudio: !!data.audioData,
                    note: "Mail credentials not configured; submission recorded",
                  }),
                );
                return;
              }

              const { Resend } = await import("resend");
              const resend = new Resend(apiKey);
              const { error } = await resend.emails.send({
                from,
                to,
                bcc: bcc || undefined,
                replyTo: data.email,
                subject: `Portfolio contact: ${data.name}${data.audioData ? " [Voice Memo]" : ""}`,
                text: `Name: ${data.name}\nEmail: ${data.email}\nSource: ${data.source ?? "portfolio"}\n\n${data.message}${audioNoteInfo}`,
              });

              if (error) {
                console.error("[contact] Resend error:", error);
                res.statusCode = 502;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    message: "Failed to send message. Try email or WhatsApp instead.",
                  }),
                );
                return;
              }

              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true, delivered: true, hasAudio: !!data.audioData }));
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : "Internal server error";
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
