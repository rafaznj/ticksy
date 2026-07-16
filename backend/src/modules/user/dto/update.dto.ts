import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create.dto";
import { IsBoolean, IsEnum } from "class-validator";
import { UserRoleEnum } from "../enums/roles.enum";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;

  @IsBoolean()
  isActive!: boolean;
}
