import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "user@ticksy.email.com", maxLength: 254 })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiProperty({
    description:
      "Must contain at least one lowercase letter, one uppercase letter, one digit and one special character (!@#$%)",
    format: "password",
    minLength: 8,
    maxLength: 72,
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
