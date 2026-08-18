import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import {
  CONTACT_MAILER,
  ContactService,
  defaultMailer,
} from "./contact.service";
import { RateLimitGuard } from "./rate-limit.guard";

@Module({
  controllers: [ContactController],
  providers: [
    { provide: CONTACT_MAILER, useValue: defaultMailer },
    ContactService,
    RateLimitGuard,
  ],
})
export class ContactModule {}
