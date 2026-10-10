import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { tickets } from "../../../database/drizzle/schema";
import { users } from "../../../database/drizzle/schema/users.schema";
import { TicketViewModel } from "../view-models/ticket.vm";
import { IResolvedTicketRepository } from "./contracts/resolved";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { alias } from "drizzle-orm/pg-core";

const createdByUser = alias(users, "created_by_user");
const assignedToUser = alias(users, "assigned_to_user");

export class ResolvedTicketRepository implements IResolvedTicketRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(id: string): Promise<TicketViewModel | null> {
    const [updated] = await this.db
      .update(tickets)
      .set({ status: TicketStatusEnum.RESOLVED })
      .where(eq(tickets.id, id))
      .returning({ id: tickets.id });

    if (!updated) {
      return null;
    }

    const [result] = await this.db
      .select({
        id: tickets.id,
        code: tickets.code,
        title: tickets.title,
        description: tickets.description,
        category: tickets.category,
        priority: tickets.priority,
        status: tickets.status,
        createdById: tickets.createdById,
        createdByName: createdByUser.name,
        assignedToId: tickets.assignedToId,
        assignedToName: assignedToUser.name,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
      })
      .from(tickets)
      .innerJoin(createdByUser, eq(tickets.createdById, createdByUser.id))
      .leftJoin(assignedToUser, eq(tickets.assignedToId, assignedToUser.id))
      .where(eq(tickets.id, updated.id));

    return result ?? null;
  }
}
