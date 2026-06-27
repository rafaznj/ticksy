import { PartialType } from "@nestjs/mapped-types";
import { CreateTicketDto } from "./create.dm";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { TicketStatus } from "../enums/ticket.enum";

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsUUID()
  @IsOptional()
  assignedToId?: string | null;
}
