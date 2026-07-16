import { IsString, IsNotEmpty, MaxLength, IsEmail, MinLength, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).+$/)
  password!: string;
}
