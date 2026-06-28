import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { TicketStatusEnum } from "../enums/ticket.enum";
import { CreateTicketDto } from "./create.dm";

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsEnum(TicketStatusEnum)
  @IsOptional()
  status?: TicketStatusEnum;

  @IsUUID()
  @IsOptional()
  assignedToId?: string | null;
}
