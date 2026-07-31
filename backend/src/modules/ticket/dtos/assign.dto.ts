import { IsUUID } from "class-validator";

export class AssignTicketDto {
  @IsUUID(4)
  id!: string;

  @IsUUID(4)
  userId!: string;
}
