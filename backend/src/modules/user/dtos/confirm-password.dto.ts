import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ConfirmPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).+$/)
  password!: string;
}
