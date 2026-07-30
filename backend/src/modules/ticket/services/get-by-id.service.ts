import { Inject, Injectable } from "@nestjs/common";
import { BaseGetByIdService } from "../../../shared/base/services/get-by-id.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetTicketByIdRepository } from "../repositories/contracts/get-by-id";
import { IGetTicketByIdService } from "./contracts/get-by-id";
import { TicketModel } from "../models/ticket";

@Injectable()
export class GetTicketByIdService
  extends BaseGetByIdService<TicketModel>
  implements IGetTicketByIdService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketByIdRepository)
    getTicketByIdRepository: IGetTicketByIdRepository,
  ) {
    super(getTicketByIdRepository);
  }
}
