import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
} from "class-validator";
import { UserRoleEnum } from "../enums/roles.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsEnum(UserRoleEnum)
  @IsOptional()
  role?: UserRoleEnum;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).+$/)
  password!: string;
}
