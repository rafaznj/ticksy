import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ConfirmPasswordDto {
  @ApiProperty({
    description:
      "Must contain at least one lowercase letter, one uppercase letter, one digit and one special character (!@#$%)",
    format: "password",
    minLength: 8,
    maxLength: 72,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).+$/)
  password!: string;
}
