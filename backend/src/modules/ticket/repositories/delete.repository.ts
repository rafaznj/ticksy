import { Injectable } from "@nestjs/common";
import { tickets } from "../../../database/drizzle/schema";
import { BaseDeleteRepository } from "../../../shared/base/repositories/delete.repository";
import { IDeleteTicketRepository } from "./contracts/delete";

@Injectable()
export class DeleteTicketRepository
  extends BaseDeleteRepository
  implements IDeleteTicketRepository
{
  constructor() {
    super(tickets);
  }
}
