import { Inject } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { ticket } from "../../../database/drizzle/schema/ticket.schema";
import { user } from "../../../database/drizzle/schema/user.schema";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IQueryOptions } from "../../../shared/types/query-options";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { IGetTicketPagedRepository } from "./contracts/get-paged";
import { TicketPagedModel } from "../models/ticket-paged";

export class GetTicketPagedRepository implements IGetTicketPagedRepository {
  @Inject(DATABASE_TOKENS.Drizzle)
  private db!: NodePgDatabase;

  async execute(options: IQueryOptions): Promise<IPagedResult<TicketPagedModel>> {
    const { limit, offset } = buildPagedOptions(options);
    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, ticket);

    const createdByUser = alias(user, "created_by_user");
    const assignedToUser = alias(user, "assigned_to_user");

    const queryBuilder = this.db
      .select({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        createdByName: createdByUser.name,
        assignedToName: assignedToUser.name,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
      })
      .from(ticket)
      .innerJoin(createdByUser, eq(ticket.createdById, createdByUser.id))
      .leftJoin(assignedToUser, eq(ticket.assignedToId, assignedToUser.id))
      .where(and(whereCondition, softDeleteCondition))
      .limit(limit)
      .offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as TicketPagedModel[];
    const totalRecords = await this.db.$count(ticket);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
