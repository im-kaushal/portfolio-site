import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ContactDto } from "./contact.dto";

function dto(partial: Record<string, unknown>) {
  return plainToInstance(ContactDto, partial);
}

describe("ContactDto", () => {
  it("accepts a valid payload", async () => {
    const errors = await validate(
      dto({
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "Would love to talk about a frontend platform role.",
        source: "/work/marriott",
      }),
    );
    expect(errors).toHaveLength(0);
  });

  it("rejects a short name", async () => {
    const errors = await validate(
      dto({
        name: "A",
        email: "ada@example.com",
        message: "Would love to talk about a frontend platform role.",
      }),
    );
    expect(errors.some((e) => e.property === "name")).toBe(true);
  });

  it("rejects an invalid email", async () => {
    const errors = await validate(
      dto({
        name: "Ada Lovelace",
        email: "not-an-email",
        message: "Would love to talk about a frontend platform role.",
      }),
    );
    expect(errors.some((e) => e.property === "email")).toBe(true);
  });

  it("rejects a short message", async () => {
    const errors = await validate(
      dto({
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "Hi",
      }),
    );
    expect(errors.some((e) => e.property === "message")).toBe(true);
  });

  it("accepts a valid payload with voice recording", async () => {
    const errors = await validate(
      dto({
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "Audio note attached.",
        source: "/#contact",
        audioData: "dGVzdC1hdWRpby1kYXRh",
        audioDuration: 14.5,
        transcript: "Hi Kaushal, loved your portfolio.",
      }),
    );
    expect(errors).toHaveLength(0);
  });
});
