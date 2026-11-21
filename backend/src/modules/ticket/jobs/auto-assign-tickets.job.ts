import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IAutoAssignTicketService } from "../services/contracts/auto-assign-tickets";

@Injectable()
export class AutoAssignTicketsJob {
  private readonly logger = new Logger(AutoAssignTicketsJob.name);

  constructor(
    @Inject(SERVICE_TOKENS.AutoAssignTicketService)
    private readonly autoAssignTicketService: IAutoAssignTicketService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async execute(): Promise<void> {
    this.logger.log("Running daily cron job for automatic ticket linking");
    await this.autoAssignTicketService.execute();
  }
}
