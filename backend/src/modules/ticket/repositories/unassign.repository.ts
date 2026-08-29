import { Inject } from "@nestjs/common";
import { and, eq, isNotNull } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ticket } from "../../../database/drizzle/schema";
import { TicketModel } from "../models/ticket";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { IUnassignTicketRepository } from "./contracts/unassign";

export class UnassignTicketRepository implements IUnassignTicketRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const [result] = await this.db
      .update(ticket)
      .set({ assignedToId: null, status: TicketStatusEnum.OPEN })
      .where(and(eq(ticket.id, id), isNotNull(ticket.assignedToId)))
      .returning();

    return result ?? null;
  }
}
