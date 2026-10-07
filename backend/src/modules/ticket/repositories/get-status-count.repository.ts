import { Inject } from "@nestjs/common";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { StatusCountModel } from "../models/status-count";
import { tickets } from "../../../database/drizzle/schema";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { IGetTicketStatusCountRepository } from "./contracts/get-status-count";

export class GetTicketStatusCountRepository implements IGetTicketStatusCountRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(): Promise<StatusCountModel[]> {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const totalWeeks = Math.ceil(daysInMonth / 7);

    const weekOfMonth =
      sql<number>`floor((extract(day from ${tickets.createdAt}) - 1) / 7) + 1`.mapWith(Number);

    const rows = await this.db
      .select({
        week: weekOfMonth,
        open: sql<number>`count(*) filter (where ${eq(tickets.status, TicketStatusEnum.OPEN)})`.mapWith(
          Number,
        ),
        inProgress:
          sql<number>`count(*) filter (where ${eq(tickets.status, TicketStatusEnum.IN_PROGRESS)})`.mapWith(
            Number,
          ),
        resolved:
          sql<number>`count(*) filter (where ${eq(tickets.status, TicketStatusEnum.RESOLVED)})`.mapWith(
            Number,
          ),
      })
      .from(tickets)
      .where(and(gte(tickets.createdAt, start), lt(tickets.createdAt, end)))
      .groupBy(weekOfMonth);

    return Array.from({ length: totalWeeks }, (_, index) => {
      const row = rows.find((item) => item.week === index + 1);

      return {
        week: index + 1,
        open: row?.open ?? 0,
        inProgress: row?.inProgress ?? 0,
        resolved: row?.resolved ?? 0,
      };
    });
  }
}
