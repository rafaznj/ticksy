import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ticket } from "../../../database/drizzle/schema";
import { TicketModel } from "../models/ticket";
import { IChangeStatusTicketRepository } from "./contracts/change-status";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export class ChangeStatusTicketRepository implements IChangeStatusTicketRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(id: string, status: TicketStatusEnum): Promise<TicketModel | null> {
    const [result] = await this.db
      .update(ticket)
      .set({ status: status })
      .where(eq(ticket.id, id))
      .returning();

    return result ?? null;
  }
}
