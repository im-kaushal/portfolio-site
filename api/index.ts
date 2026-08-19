import "reflect-metadata";
import type { IncomingMessage, ServerResponse } from "http";
import { createNestApp } from "../apps/api/dist/bootstrap";

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
  cached(req, res);
}
