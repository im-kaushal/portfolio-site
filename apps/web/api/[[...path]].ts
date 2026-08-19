import "reflect-metadata";
import type { IncomingMessage, ServerResponse } from "http";
import express from "express";
import { createNestApp } from "../../api/src/bootstrap";

let cached:
  | ((req: IncomingMessage, res: ServerResponse) => void)
  | undefined;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!cached) {
    const server = express();
    const app = await createNestApp(server);
    await app.init();
    cached = server;
  }
  cached(req, res);
}
