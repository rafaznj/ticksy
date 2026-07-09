import { injectable } from "inversify";
import type { IDeleteTicketRepository } from "./contracts/delete";
import { BaseDeleteRepository } from "@/shared/base/repositories/delete.repository";

@injectable()
export class DeleteTicketRepository
  extends BaseDeleteRepository
  implements IDeleteTicketRepository
{
  constructor() {
    super("/ticket");
  }
}
