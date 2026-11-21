import { Inject, Injectable, Logger } from "@nestjs/common";
import { IAutoAssignTicketService } from "./contracts/auto-assign-tickets";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetUnassignedTicketsRepository } from "../repositories/contracts/get-unassigned-tickets";
import type { IGetUserIdsByRoleService } from "../../user/services/contracts/get-ids-by-role";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { UserRoleEnum } from "../../user/enums/role.enum";
import type { IAssignTicketService } from "./contracts/assign";
import type { ICountInprogressTicketsByTechnicianRepository } from "../repositories/contracts/count-in-progress-tickets-by-technician";

const MAX_IN_PROGRESS_TICKETS_PER_TECHNICIAN = 5;

@Injectable()
export class AutoAssignTicketService implements IAutoAssignTicketService {
  private readonly logger = new Logger(AutoAssignTicketService.name);

  constructor(
    @Inject(REPOSITORY_TOKENS.GetUnassignedTicketsRepository)
    private readonly getUnassignedTicketsRepository: IGetUnassignedTicketsRepository,
    @Inject(REPOSITORY_TOKENS.CountInprogressTicketsByTechnicianRepository)
    private readonly countInprogressTicketsByTechnicianRepository: ICountInprogressTicketsByTechnicianRepository,
    @Inject(SERVICE_TOKENS.GetUserIdsByRoleService)
    private readonly getUserIdsByRoleService: IGetUserIdsByRoleService,
    @Inject(SERVICE_TOKENS.AssignTicketService)
    private readonly assignTicketService: IAssignTicketService,
  ) {}

  async execute(): Promise<void> {
    const technicianIds = await this.getUserIdsByRoleService.execute(
      UserRoleEnum.TECHNICAL_ASSISTANCE,
    );

    if (!technicianIds.length) {
      this.logger.warn(
        "No technicians with the 'technical_assistance' role available for assignment.",
      );
      return;
    }

    const unassignedTickets = await this.getUnassignedTicketsRepository.execute();

    if (!unassignedTickets.length) {
      this.logger.log("No unassigned tickets pending.");
      return;
    }

    const inProgressCounts =
      await this.countInprogressTicketsByTechnicianRepository.execute(technicianIds);

    const technicians = inProgressCounts
      .filter(({ count }) => count < MAX_IN_PROGRESS_TICKETS_PER_TECHNICIAN)
      .map(({ technicianId, count }) => ({
        id: technicianId,
        currentCount: count,
      }));

    if (!technicians.length) {
      this.logger.log(
        `All technicians have reached the maximum capacity of ${MAX_IN_PROGRESS_TICKETS_PER_TECHNICIAN} active tickets.`,
      );
      return;
    }

    this.logger.log(
      `Starting distribution of ${unassignedTickets.length} tickets among ${technicians.length} technicians with available capacity.`,
    );

    for (const ticket of unassignedTickets) {
      technicians.sort((a, b) => a.currentCount - b.currentCount);

      const targetTech = technicians[0];

      if (!targetTech || targetTech.currentCount >= MAX_IN_PROGRESS_TICKETS_PER_TECHNICIAN) {
        this.logger.log("All technicians have reached their maximum capacity.");
        break;
      }

      try {
        const assigned = await this.assignTicketService.execute(ticket.id, targetTech.id);

        if (assigned) {
          targetTech.currentCount++;
        }
      } catch (error) {
        this.logger.error(
          `Failed to assign ticket ${ticket.id} to technician ${targetTech.id}`,
          error instanceof Error ? error.stack : String(error),
        );
      }
    }

    this.logger.log("Automatic ticket distribution completed.");
  }
}
