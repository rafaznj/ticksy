import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create.dto";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "Indicates whether the user has been deleted.",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}
