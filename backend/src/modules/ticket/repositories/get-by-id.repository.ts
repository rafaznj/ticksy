import { Injectable } from "@nestjs/common";
import { IGetTicketByIdRepository } from "./contracts/get-by-id";
import { ticket } from "../../../database/drizzle/schema";
import { BaseGetByIdRepository } from "../../../shared/base/repositories/get-by-id.repository";
import { CreateTicketDto } from "../dtos/create.dto";

@Injectable()
export class GetTicketByIdRepository
  extends BaseGetByIdRepository<CreateTicketDto>
  implements IGetTicketByIdRepository
{
  constructor() {
    super(ticket);
  }
}
