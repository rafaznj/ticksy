import { Inject } from "@nestjs/common";
import { and, eq, isNull } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { IAssignTicketRepository } from "./contracts/assign";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { tickets } from "../../../database/drizzle/schema";
import { users } from "../../../database/drizzle/schema/users.schema";
import { alias } from "drizzle-orm/pg-core";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { TicketAssignViewModel } from "../view-models/assign.vm";

const createdByUser = alias(users, "created_by_user");
const assignedToUser = alias(users, "assigned_to_user");

export class AssignTicketRepository implements IAssignTicketRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(id: string, userId: string): Promise<TicketAssignViewModel | null> {
    const [updated] = await this.db
      .update(tickets)
      .set({ assignedToId: userId, status: TicketStatusEnum.IN_PROGRESS })
      .where(and(eq(tickets.id, id), isNull(tickets.assignedToId)))
      .returning({ id: tickets.id });

    if (!updated) {
      return null;
    }

    const [result] = await this.db
      .select({
        id: tickets.id,
        code: tickets.code,
        title: tickets.title,
      })
      .from(tickets)
      .innerJoin(createdByUser, eq(tickets.createdById, createdByUser.id))
      .leftJoin(assignedToUser, eq(tickets.assignedToId, assignedToUser.id))
      .where(eq(tickets.id, updated.id));

    return result ?? null;
  }
}
