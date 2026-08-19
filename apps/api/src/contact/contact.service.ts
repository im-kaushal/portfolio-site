import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { ContactDto } from "./contact.dto";

export type ContactResult = { ok: true; delivered: boolean };

export type MailPayload = {
  apiKey: string;
  from: string;
  to: string;
  bcc?: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type Mailer = {
  send: (payload: MailPayload) => Promise<void>;
};

export const CONTACT_MAILER = "CONTACT_MAILER";

export const defaultMailer: Mailer = {
  async send(payload) {
    const resend = new Resend(payload.apiKey);
    const { error } = await resend.emails.send({
      from: payload.from,
      to: payload.to,
      bcc: payload.bcc || undefined,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
    });
    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[contact] Resend error:", error);
      }
      throw new HttpException(
        "Failed to send message. Try email or WhatsApp instead.",
        HttpStatus.BAD_GATEWAY,
      );
    }
  },
};

@Injectable()
export class ContactService {
  constructor(@Inject(CONTACT_MAILER) private readonly mailer: Mailer) {}

  async submit(dto: ContactDto): Promise<ContactResult> {
    if (dto.website && dto.website.trim().length > 0) {
      return { ok: true, delivered: false };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    const bcc = process.env.CONTACT_BCC_EMAIL;

    if (!apiKey || !to || !from) {
      throw new HttpException(
        "Contact mailer is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const text = [
      `Name: ${dto.name}`,
      `Email: ${dto.email}`,
      `Source: ${dto.source ?? "portfolio"}`,
      "",
      dto.message,
    ].join("\n");

    await this.mailer.send({
      apiKey,
      from,
      to,
      bcc,
      replyTo: dto.email,
      subject: `Portfolio contact: ${dto.name}`,
      text,
    });

    return { ok: true, delivered: true };
  }
}
