import { Inject } from "@nestjs/common";
import { and, eq, gte } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { tickets } from "../../../database/drizzle/schema/tickets.schema";
import { users } from "../../../database/drizzle/schema/users.schema";
import { IQueryOptions } from "../../../shared/interfaces/query-options";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { IGetTicketPagedLastSevenDaysRepository } from "./contracts/get-paged-last-seven-days";
import { TicketPagedLastSevenDaysViewModel } from "../view-models/paged-last-seven-day.vm";
import { TicketScopeViewModel } from "../view-models/scope.vm";
import { IPagedResult } from "../../../shared/interfaces/paged-result";

const createdByUser = alias(users, "created_by_user");

export class GetTicketPagedLastSevenDaysRepository implements IGetTicketPagedLastSevenDaysRepository {
  @Inject(DATABASE_TOKENS.Drizzle)
  private db!: NodePgDatabase;

  async execute(
    options: IQueryOptions,
    scope?: TicketScopeViewModel,
  ): Promise<IPagedResult<TicketPagedLastSevenDaysViewModel>> {
    const { limit, offset } = buildPagedOptions(options);
    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, tickets);

    const now = new Date();
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    const lastSevenDaysCondition = gte(tickets.createdAt, sevenDaysAgo);

    const scopeCondition = scope?.assignedToId
      ? eq(tickets.assignedToId, scope.assignedToId)
      : scope?.createdById
        ? eq(tickets.createdById, scope.createdById)
        : undefined;

    const combinedCondition = and(
      whereCondition,
      softDeleteCondition,
      lastSevenDaysCondition,
      scopeCondition,
    );

    const queryBuilder = this.db
      .select({
        id: tickets.id,
        code: tickets.code,
        title: tickets.title,
        description: tickets.description,
        createdByName: createdByUser.name,
        status: tickets.status,
        priority: tickets.priority,
        category: tickets.category,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
      })
      .from(tickets)
      .innerJoin(createdByUser, eq(tickets.createdById, createdByUser.id))
      .where(combinedCondition)
      .limit(limit)
      .offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as TicketPagedLastSevenDaysViewModel[];
    const totalRecords = await this.db.$count(tickets, combinedCondition);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
