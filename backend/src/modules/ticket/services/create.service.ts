import { Inject, Injectable } from "@nestjs/common";

import { BaseCreateService } from "../../../shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { CreateTicketDto } from "../dtos/create.dto";
import { ICreateTicketService } from "./contracts/create";
import type { ICreateTicketRepository } from "../repositories/contracts/create";
import { TicketViewModel } from "../view-models/ticket.vm";
import type { ICreateNotificationService } from "../../notification/services/contracts/create";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { NotificationTypeEnum } from "../../notification/enums/notification-type.enum";
import type { IGetUserIdsByRoleService } from "../../user/services/contracts/get-ids-by-role";
import { UserRoleEnum } from "../../user/enums/role.enum";
import { CreateTicketData } from "../data/create.data";

@Injectable()
export class CreateTicketService
  extends BaseCreateService<CreateTicketData, TicketViewModel>
  implements ICreateTicketService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.CreateTicketRepository)
    createTicketRepository: ICreateTicketRepository,
    @Inject(SERVICE_TOKENS.CreateNotificationService)
    private readonly createNotificationService: ICreateNotificationService,
    @Inject(SERVICE_TOKENS.GetUserIdsByRoleService)
    private readonly getUserIdsByRoleService: IGetUserIdsByRoleService,
  ) {
    super(createTicketRepository);
  }

  async execute(data: CreateTicketDto): Promise<TicketViewModel> {
    const response = await super.execute(data);

    const adminIds = await this.getUserIdsByRoleService.execute(UserRoleEnum.ADMIN);

    await this.createNotificationService.execute({
      type: NotificationTypeEnum.TICKET_CREATED,
      ticketId: response.id,
      parameters: {
        userName: response.createdByName,
        title: response.title,
      },
      userIds: adminIds,
    });

    return response;
  }
}
