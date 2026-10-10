import { inject, injectable } from "inversify";
import { BaseGetByIdService } from "@/shared/base/services/get-by-id.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { IGetTicketByIdService } from "@/modules/ticket/services/contracts/get-by-id";

@injectable()
export class GetTicketByIdService
  extends BaseGetByIdService<TicketDto>
  implements IGetTicketByIdService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetUserByIdRepository)
    repository: IGetTicketByIdRepository,
  ) {
    super(repository);
  }
}
