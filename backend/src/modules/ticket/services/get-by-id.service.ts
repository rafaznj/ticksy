import { Inject, Injectable } from "@nestjs/common";
import { BaseGetByIdService } from "../../../shared/base/services/get-by-id.service";
import { CreateTicketDto } from "../dto/create.dm";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetTicketByIdRepository } from "../repositories/contracts/get-by-id";
import { IGetTicketByIdService } from "./contracts/get-by-id";

@Injectable()
export class GetTicketByIdService
  extends BaseGetByIdService<CreateTicketDto>
  implements IGetTicketByIdService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketByIdRepository)
    private readonly getTicketByIdRepository: IGetTicketByIdRepository,
  ) {
    super(getTicketByIdRepository);
  }
}
