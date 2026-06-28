import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dm";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
