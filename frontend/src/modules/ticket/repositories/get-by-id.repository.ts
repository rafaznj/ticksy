import { injectable, injectFromBase } from "inversify";
import { BaseGetByIdRepository } from "@/shared/base/repositories/get-by-id.repository";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";

@injectFromBase()
@injectable()
export class GetTicketByIdRepository
  extends BaseGetByIdRepository<TicketDto>
  implements IGetTicketByIdRepository
{
  constructor() {
    super("/ticket");
  }
}
