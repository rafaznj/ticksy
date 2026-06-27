import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { TicketPriority } from "../enums/ticket.enum";

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(TicketPriority)
  priority!: TicketPriority;
}
