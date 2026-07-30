import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { IAssignTicketRepository } from "./contracts/assign";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ticket } from "../../../database/drizzle/schema";
import { TicketModel } from "../models/ticket";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export class AssignTicketRepository implements IAssignTicketRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(id: string, userId: string): Promise<TicketModel | null> {
    const [result] = await this.db
      .update(ticket)
      .set({ assignedToId: userId, status: TicketStatusEnum.IN_PROGRESS })
      .where(eq(ticket.id, id))
      .returning();

    return result ?? null;
  }
}
