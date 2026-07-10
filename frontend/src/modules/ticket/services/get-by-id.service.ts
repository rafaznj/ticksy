import { inject, injectable } from "inversify";
import { BaseGetByIdService } from "@/shared/base/services/get-by-id.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";
import type { IGetTicketByIdService } from "@/modules/ticket/services/contracts/get-by-id";

@injectable()
export class GetTicketByIdService
  extends BaseGetByIdService<Ticket>
  implements IGetTicketByIdService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByIdRepository)
    repository: IGetTicketByIdRepository,
  ) {
    super(repository);
  }
}
