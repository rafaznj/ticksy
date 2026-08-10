import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ticket } from "../../../database/drizzle/schema";
import { TicketModel } from "../models/ticket";
import { IResolvedTicketRepository } from "./contracts/resolved";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export class ResolvedTicketRepository implements IResolvedTicketRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const [result] = await this.db
      .update(ticket)
      .set({ status: TicketStatusEnum.RESOLVED })
      .where(eq(ticket.id, id))
      .returning();

    return result ?? null;
  }
}
