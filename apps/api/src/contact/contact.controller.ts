import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ContactDto } from "./contact.dto";
import { ContactService } from "./contact.service";
import { RateLimitGuard } from "./rate-limit.guard";

@Controller("contact")
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post()
  @UseGuards(RateLimitGuard)
  submit(@Body() dto: ContactDto) {
    return this.contact.submit(dto);
  }
}
