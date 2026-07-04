import { Injectable } from "@nestjs/common";
import { ticket } from "../../../database/drizzle/schema";
import { BaseDeleteRepository } from "../../../shared/base/repositories/delete.repository";
import { IDeleteTicketRepository } from "./contracts/delete";

@Injectable()
export class DeleteTicketRepository
  extends BaseDeleteRepository
  implements IDeleteTicketRepository
{
  constructor() {
    super(ticket);
  }
}
