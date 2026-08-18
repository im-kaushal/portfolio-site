import { HttpException } from "@nestjs/common";
import { ContactService, Mailer } from "./contact.service";
import { ContactDto } from "./contact.dto";

function makeDto(over: Partial<ContactDto> = {}): ContactDto {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Would love to talk about a frontend platform role.",
    source: "/",
    ...over,
  };
}

describe("ContactService", () => {
  const original = { ...process.env };

  afterEach(() => {
    process.env = { ...original };
  });

  it("drops honeypot submissions without sending mail", async () => {
    const send = jest.fn();
    const service = new ContactService({ send } as Mailer);
    const result = await service.submit(makeDto({ website: "http://spam.test" }));
    expect(result).toEqual({ ok: true, delivered: false });
    expect(send).not.toHaveBeenCalled();
  });

  it("throws when mailer env is missing", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
    const service = new ContactService({ send: jest.fn() });
    await expect(service.submit(makeDto())).rejects.toBeInstanceOf(HttpException);
  });

  it("sends mail when configured", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "you@gmail.com";
    process.env.CONTACT_FROM_EMAIL = "Portfolio <onboarding@resend.dev>";
    process.env.CONTACT_BCC_EMAIL = "work.kaushal@yahoo.com";
    const send = jest.fn().mockResolvedValue(undefined);
    const service = new ContactService({ send });
    const result = await service.submit(makeDto());
    expect(result).toEqual({ ok: true, delivered: true });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "you@gmail.com",
        replyTo: "ada@example.com",
        bcc: "work.kaushal@yahoo.com",
        subject: "Portfolio contact: Ada Lovelace",
      }),
    );
  });
});
