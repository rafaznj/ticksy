import type { UpdateTicketData } from "@/modules/ticket/data/update.data";
import type { IUpdateTicketRepository } from "@/modules/ticket/repositories/contracts/update";
import { BaseUpdateRepository } from "@/shared/base/repositories/update.repository";
import { injectable, injectFromBase } from "inversify";

@injectFromBase()
@injectable()
export class UpdateTicketRepository
  extends BaseUpdateRepository<UpdateTicketData>
  implements IUpdateTicketRepository
{
  constructor() {
    super("/ticket");
  }
}
