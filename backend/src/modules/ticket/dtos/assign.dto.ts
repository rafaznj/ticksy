import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class AssignTicketDto {
  @ApiProperty({
    description: "ID of the user the ticket will be assigned to",
    format: "uuid",
    example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}
