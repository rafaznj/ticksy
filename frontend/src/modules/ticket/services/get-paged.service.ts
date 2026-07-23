import { BaseGetPagedService } from "@/shared/base/services/get-paged.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import type { TicketEntity } from "../../../../../backend/dist/src/modules/ticket/entity/ticket.entity";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
import type { IGetTicketPagedRepository } from "@/modules/ticket/repositories/contracts/get-paged";

@injectable()
export class GetTicketPagedService
  extends BaseGetPagedService<TicketEntity>
  implements IGetTicketPagedService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketPagedRepository)
    getTicketPagedRepository: IGetTicketPagedRepository,
  ) {
    super(getTicketPagedRepository);
  }
}
