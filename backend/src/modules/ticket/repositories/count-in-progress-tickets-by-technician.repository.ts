import { Inject, Injectable } from "@nestjs/common";
import { and, count, eq, inArray } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { tickets } from "../../../database/drizzle/schema";
import { relations } from "../../../database/drizzle/schema/relations";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { ICountInprogressTicketsByTechnicianRepository } from "./contracts/count-in-progress-tickets-by-technician";
import { ICountInProgressTickets } from "../view-models/count-in-progress.vm";

@Injectable()
export class CountInprogressTicketsByTechnicianRepository implements ICountInprogressTicketsByTechnicianRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase<typeof relations>,
  ) {}

  async execute(technicianIds: string[]): Promise<ICountInProgressTickets[]> {
    if (technicianIds.length === 0) return [];

    const rows = await this.db
      .select({
        technicianId: tickets.assignedToId,
        total: count(tickets.id),
      })
      .from(tickets)
      .where(
        and(
          inArray(tickets.assignedToId, technicianIds),
          eq(tickets.status, TicketStatusEnum.IN_PROGRESS),
        ),
      )
      .groupBy(tickets.assignedToId);

    const totals = new Map(rows.map((row) => [row.technicianId, row.total]));

    return technicianIds.map((technicianId) => ({
      technicianId,
      count: totals.get(technicianId) ?? 0,
    }));
  }
}
