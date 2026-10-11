import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { CreateTicketDto } from "./create.dto";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiPropertyOptional({ enum: TicketStatusEnum, enumName: "TicketStatusEnum" })
  @IsEnum(TicketStatusEnum)
  @IsOptional()
  status?: TicketStatusEnum;

  @ApiPropertyOptional({
    description: "ID of the assigned user",
    format: "uuid",
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  assignedToId?: string | null;
}
