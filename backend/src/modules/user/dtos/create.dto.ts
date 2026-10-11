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
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "John Doe", maxLength: 80 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name!: string;

  @ApiProperty({ example: "john.doe@ticksy.email.com", maxLength: 254 })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiProperty({ enum: UserRoleEnum, enumName: "UserRoleEnum" })
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;

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

  @ApiPropertyOptional({
    description: "Whether the user must change the password after logging in",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  mustChangePassword?: boolean;
}
