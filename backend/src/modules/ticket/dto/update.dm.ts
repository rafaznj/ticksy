import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { CreateTicketDto } from "./create.dm";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsEnum(TicketStatusEnum)
  @IsOptional()
  status?: TicketStatusEnum;

  @IsUUID()
  @IsOptional()
  assignedToId?: string | null;
}
