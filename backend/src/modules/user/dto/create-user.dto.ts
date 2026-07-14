import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { UserRoleEnum } from "../enums/roles.enum";

export class CreateUserDto {
  @IsUUID(4)
  @IsEmpty()
  id!: string;

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
