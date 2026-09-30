import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketCategoryEnum } from "../enums/ticket-category.enum";

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(TicketCategoryEnum)
  @IsNotEmpty()
  category!: TicketCategoryEnum;

  @IsEnum(TicketPriorityEnum)
  @IsNotEmpty()
  priority!: TicketPriorityEnum;

  @IsUUID()
  @IsNotEmpty()
  createdById!: string;
}
