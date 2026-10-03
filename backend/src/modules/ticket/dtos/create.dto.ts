import { IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketCategoryEnum } from "../enums/ticket-category.enum";

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  description!: string;

  @IsNotEmpty()
  @IsEnum(TicketCategoryEnum)
  category!: TicketCategoryEnum;

  @IsNotEmpty()
  @IsEnum(TicketPriorityEnum)
  priority!: TicketPriorityEnum;

  @IsNotEmpty()
  @IsUUID()
  createdById!: string;
}
