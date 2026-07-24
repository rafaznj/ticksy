import { BaseGetPagedService } from "@/shared/base/services/get-paged.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
import type { IGetTicketPagedRepository } from "@/modules/ticket/repositories/contracts/get-paged";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";

@injectable()
export class GetTicketPagedService
  extends BaseGetPagedService<TicketPagedDto>
  implements IGetTicketPagedService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketPagedRepository)
    getTicketPagedRepository: IGetTicketPagedRepository,
  ) {
    super(getTicketPagedRepository);
  }
}
