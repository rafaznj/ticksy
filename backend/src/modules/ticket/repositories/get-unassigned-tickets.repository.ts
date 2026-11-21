import { Inject } from "@nestjs/common";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { IGetUnassignedTicketsRepository } from "./contracts/get-unassigned-tickets";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { relations } from "../../../database/drizzle/schema/relations";
import { TicketViewModel } from "../view-models/ticket.vm";

export class GetUnassignedTicketsRepository implements IGetUnassignedTicketsRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase<typeof relations>,
  ) {}

  async execute(): Promise<TicketViewModel[]> {
    const unassignedTickets = await this.db.query.tickets.findMany({
      where: {
        assignedToId: { isNull: true },
      },
      orderBy: {
        priority: "desc",
        createdAt: "asc",
        id: "asc",
      },
    });

    return unassignedTickets;
  }
}
