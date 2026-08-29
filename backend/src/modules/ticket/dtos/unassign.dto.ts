import { IsNotEmpty, IsUUID } from "class-validator";

export class UnassignTicketDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
