import { Inject } from "@nestjs/common";
import { IResolvedTicketService } from "./contracts/resolved";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IResolvedTicketRepository } from "../repositories/contracts/resolved";
import { TicketModel } from "../models/ticket";
import { AppException } from "../../../shared/exceptions/app-exception";
import type { IGetTicketByIdService } from "./contracts/get-by-id";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { NotificationTypeEnum } from "../../notification/enums/notification-type.enum";
import type { ICreateNotificationService } from "../../notification/services/contracts/create";
import type { IGetUserIdsByRoleService } from "../../user/services/contracts/get-ids-by-role";
import { UserRoleEnum } from "../../user/enums/role.enum";

export class ResolvedTicketService implements IResolvedTicketService {
  constructor(
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
    @Inject(REPOSITORY_TOKENS.ResolvedTicketRepository)
    private readonly resolvedTicketRepository: IResolvedTicketRepository,
    @Inject(SERVICE_TOKENS.CreateNotificationService)
    private readonly createNotificationService: ICreateNotificationService,
    @Inject(SERVICE_TOKENS.GetUserIdsByRoleService)
    private readonly getUserIdsByRoleService: IGetUserIdsByRoleService,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const ticket = await this.getTicketByIdService.execute(id);

    if (!ticket) {
      throw AppException.notFound("ticket.messages.errors.notFound");
    }

    if (!ticket.assignedToId) {
      throw AppException.conflict("ticket.messages.errors.resolveFailed");
    }

    const response = await this.resolvedTicketRepository.execute(id);

    if (!response || !response.assignedName) {
      throw AppException.notFound("ticket.messages.errors.resolveFailed");
    }

    const adminIds = await this.getUserIdsByRoleService.execute(UserRoleEnum.ADMIN);

    await this.createNotificationService.execute({
      type: NotificationTypeEnum.TICKET_STATUS_CHANGED,
      ticketId: response.id,
      parameters: {
        userName: response.assignedName,
        title: response.title,
        status: response.status,
      },
      userIds: [ticket.assignedToId, ...adminIds],
    });

    return response;
  }
}
