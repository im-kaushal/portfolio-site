import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ContactDto } from "./contact.dto";
import { ContactService } from "./contact.service";
import { RateLimitGuard } from "./rate-limit.guard";

@Controller("contact")
export class ContactController {
  constructor(
    @Inject(ContactService) private readonly contactService: ContactService,
  ) {}

  @Post()
  @UseGuards(RateLimitGuard)
  submit(@Body() dto: ContactDto) {
    return this.contactService.submit(dto);
  }
}
