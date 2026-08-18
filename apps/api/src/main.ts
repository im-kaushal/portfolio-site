import "reflect-metadata";
import { createNestApp } from "./bootstrap";

async function main(): Promise<void> {
  const app = await createNestApp();
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}/api`);
}

void main();
