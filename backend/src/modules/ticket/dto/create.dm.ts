import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TicketPriorityEnum } from "../enums/ticket.enum";

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(TicketPriorityEnum)
  priority!: TicketPriorityEnum;
}
