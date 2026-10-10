import { Inject, Injectable } from "@nestjs/common";
import { BaseGetByIdService } from "../../../shared/base/services/get-by-id.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetTicketByIdRepository } from "../repositories/contracts/get-by-id";
import { IGetTicketByIdService } from "./contracts/get-by-id";
import { TicketViewModel } from "../view-models/ticket.vm";

@Injectable()
export class GetTicketByIdService
  extends BaseGetByIdService<TicketViewModel>
  implements IGetTicketByIdService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketByIdRepository)
    getTicketByIdRepository: IGetTicketByIdRepository,
  ) {
    super(getTicketByIdRepository);
  }
}
