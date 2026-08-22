import "reflect-metadata";
import type { IncomingMessage, ServerResponse } from "http";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(
  typeof __dirname !== "undefined"
    ? __filename
    : fileURLToPath(import.meta.url),
);
const { createNestApp } = require("./nest-dist/bootstrap.js") as {
  createNestApp: () => Promise<import("@nestjs/common").INestApplication>;
};

let cached:
  | ((req: IncomingMessage, res: ServerResponse) => void)
  | undefined;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!cached) {
    const app = await createNestApp();
    await app.init();
    cached = app.getHttpAdapter().getInstance();
  }
  cached!(req, res);
}
