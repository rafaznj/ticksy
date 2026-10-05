import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { IGetTicketByIdRepository } from "./contracts/get-by-id";
import { tickets } from "../../../database/drizzle/schema";
import { users } from "../../../database/drizzle/schema/users.schema";
import { TicketModel } from "../models/ticket";
import { alias } from "drizzle-orm/pg-core";

const createdByUser = alias(users, "created_by_user");
const assignedToUser = alias(users, "assigned_to_user");

@Injectable()
export class GetTicketByIdRepository implements IGetTicketByIdRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
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
      .where(eq(tickets.id, id))
      .limit(1);

    return result ?? null;
  }
}
