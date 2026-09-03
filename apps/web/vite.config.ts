import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function apiPlugin(): Plugin {
  return {
    name: "api-mock-and-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/health" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true, service: "kaushal-portfolio-api" }));
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

              if (!apiKey || !to || !from) {
                console.log("[contact] Received submission (mail credentials not set):", data);
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    ok: true,
                    delivered: true,
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
                subject: `Portfolio contact: ${data.name}`,
                text: `Name: ${data.name}\nEmail: ${data.email}\nSource: ${data.source ?? "portfolio"}\n\n${data.message}`,
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
              res.end(JSON.stringify({ ok: true, delivered: true }));
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
