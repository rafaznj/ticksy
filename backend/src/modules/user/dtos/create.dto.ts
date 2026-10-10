import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
  IsBoolean,
  IsOptional,
} from "class-validator";
import { UserRoleEnum } from "../enums/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).+$/)
  password!: string;

  @IsOptional()
  @IsBoolean()
  mustChangePassword?: boolean;
}
