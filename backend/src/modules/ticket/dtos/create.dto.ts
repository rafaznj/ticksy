import { IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketCategoryEnum } from "../enums/ticket-category.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
  @ApiProperty({ example: "Cannot reset my password", maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title!: string;

  @ApiProperty({
    example: "The reset email never arrives, even after several attempts",
    minLength: 10,
    maxLength: 5000,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description!: string;

  @ApiProperty({ enum: TicketCategoryEnum, enumName: "TicketCategoryEnum" })
  @IsNotEmpty()
  @IsEnum(TicketCategoryEnum)
  category!: TicketCategoryEnum;

  @ApiProperty({ enum: TicketPriorityEnum, enumName: "TicketPriorityEnum" })
  @IsNotEmpty()
  @IsEnum(TicketPriorityEnum)
  priority!: TicketPriorityEnum;

  @ApiProperty({
    description: "ID of the user who opened the ticket",
    format: "uuid",
    example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  })
  @IsNotEmpty()
  @IsUUID()
  createdById!: string;
}
