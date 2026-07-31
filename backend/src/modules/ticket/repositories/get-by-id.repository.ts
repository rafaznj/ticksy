import { Injectable } from "@nestjs/common";
import { IGetTicketByIdRepository } from "./contracts/get-by-id";
import { ticket } from "../../../database/drizzle/schema";
import { BaseGetByIdRepository } from "../../../shared/base/repositories/get-by-id.repository";
import { TicketModel } from "../models/ticket";

@Injectable()
export class GetTicketByIdRepository
  extends BaseGetByIdRepository<TicketModel>
  implements IGetTicketByIdRepository
{
  constructor() {
    super(ticket);
  }
}
