import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRoleEnum } from "../enums/roles.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;
}
