import { loadEnvFile } from "node:process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import "reflect-metadata";
import { createNestApp } from "./bootstrap";

const envPath = resolve(__dirname, "../.env");
if (existsSync(envPath)) {
  loadEnvFile(envPath);
}

async function main(): Promise<void> {
  const app = await createNestApp();
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}/api`);
}

void main();
