import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ContactDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name!: string;

  @IsEmail()
  @MaxLength(120)
  email!: string;

  @IsString()
  @MinLength(20)
  @MaxLength(4000)
  message!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  source?: string;

  /** Honeypot — must stay empty. */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}
