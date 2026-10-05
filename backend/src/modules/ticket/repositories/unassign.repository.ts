import { Inject } from "@nestjs/common";
import { and, eq, isNotNull } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { tickets } from "../../../database/drizzle/schema";
import { users } from "../../../database/drizzle/schema/users.schema";
import { TicketModel } from "../models/ticket";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { IUnassignTicketRepository } from "./contracts/unassign";
import { alias } from "drizzle-orm/pg-core";

const createdByUser = alias(users, "created_by_user");
const assignedToUser = alias(users, "assigned_to_user");

export class UnassignTicketRepository implements IUnassignTicketRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const [updated] = await this.db
      .update(tickets)
      .set({ assignedToId: null, status: TicketStatusEnum.OPEN })
      .where(and(eq(tickets.id, id), isNotNull(tickets.assignedToId)))
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
        assignedName: assignedToUser.name,
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
