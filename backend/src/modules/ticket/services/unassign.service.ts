import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { TicketModel } from "../models/ticket";
import { AppException } from "../../../shared/exceptions/app-exception";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetTicketByIdService } from "./contracts/get-by-id";
import { IUnassignTicketService } from "./contracts/unassign";
import type { IUnassignTicketRepository } from "../repositories/contracts/unassign";
import type { ICreateNotificationService } from "../../notification/services/contracts/create";
import { NotificationTypeEnum } from "../../notification/enums/notification-type.enum";

@Injectable()
export class UnassignTicketService implements IUnassignTicketService {
  constructor(
    @Inject(REPOSITORY_TOKENS.UnassignTicketRepository)
    private readonly unassignTicketRepository: IUnassignTicketRepository,
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
    @Inject(SERVICE_TOKENS.CreateNotificationService)
    private readonly createNotificationService: ICreateNotificationService,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const ticket = await this.getTicketByIdService.execute(id);

    if (!ticket) {
      throw AppException.notFound("ticket.messages.errors.notFound");
    }

    if (!ticket.assignedToId) {
      throw AppException.conflict("ticket.messages.errors.unassignFailed");
    }

    const response = await this.unassignTicketRepository.execute(id);

    if (!response) {
      throw AppException.notFound("ticket.messages.errors.unassignFailed");
    }

    await this.createNotificationService.execute({
      type: NotificationTypeEnum.TICKET_UNASSIGNED,
      ticketId: response.id,
      parameters: {
        title: response.title,
      },
      userIds: [ticket.assignedToId],
    });

    return response;
  }
}
