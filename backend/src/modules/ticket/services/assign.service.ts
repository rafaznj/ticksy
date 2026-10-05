import { Inject, Injectable } from "@nestjs/common";
import { IAssignTicketService } from "./contracts/assign";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IAssignTicketRepository } from "../repositories/contracts/assign";
import { TicketModel } from "../models/ticket";
import { AppException } from "../../../shared/exceptions/app-exception";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetTicketByIdService } from "./contracts/get-by-id";
import type { ICreateNotificationService } from "../../notification/services/contracts/create";
import { NotificationTypeEnum } from "../../notification/enums/notification-type.enum";

@Injectable()
export class AssignTicketService implements IAssignTicketService {
  constructor(
    @Inject(REPOSITORY_TOKENS.AssignTicketRepository)
    private readonly assignTicketRepository: IAssignTicketRepository,
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
    @Inject(SERVICE_TOKENS.CreateNotificationService)
    private readonly createNotificationService: ICreateNotificationService,
  ) {}

  async execute(id: string, userId: string): Promise<TicketModel | null> {
    const ticket = await this.getTicketByIdService.execute(id);

    if (!ticket) {
      throw AppException.notFound("ticket.messages.errors.notFound");
    }

    if (ticket.assignedToId) {
      throw AppException.conflict("ticket.messages.errors.alreadyAssigned");
    }

    const response = await this.assignTicketRepository.execute(id, userId);

    if (!response) {
      throw AppException.notFound("ticket.messages.errors.assignFailed");
    }

    await this.createNotificationService.execute({
      type: NotificationTypeEnum.TICKET_ASSIGNED,
      ticketId: response.id,
      parameters: {
        title: response.title,
      },
      userIds: [userId],
    });

    return response;
  }
}
