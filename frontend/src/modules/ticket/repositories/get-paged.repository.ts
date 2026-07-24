import { BaseGetPagedRepository } from "@/shared/base/repositories/get-paged.repository";
import { injectable, injectFromBase } from "inversify";
import type { IGetTicketPagedRepository } from "@/modules/ticket/repositories/contracts/get-paged";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";

@injectFromBase()
@injectable()
export class GetTicketPagedRepository
  extends BaseGetPagedRepository<TicketPagedDto>
  implements IGetTicketPagedRepository
{
  constructor() {
    super("/ticket");
  }
}
