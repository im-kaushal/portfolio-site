import "reflect-metadata";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import type { Express } from "express";
import { AppModule } from "./app.module";

export function applyAppConfig(app: INestApplication): void {
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: process.env.WEB_ORIGIN?.split(",") ?? true,
    methods: ["GET", "POST", "OPTIONS"],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
}

export async function createNestApp(
  expressInstance?: Express,
): Promise<INestApplication> {
  const app = expressInstance
    ? await NestFactory.create(AppModule, new ExpressAdapter(expressInstance), {
        logger: ["error", "warn", "log"],
      })
    : await NestFactory.create(AppModule, { logger: ["error", "warn", "log"] });
  applyAppConfig(app);
  return app;
}
