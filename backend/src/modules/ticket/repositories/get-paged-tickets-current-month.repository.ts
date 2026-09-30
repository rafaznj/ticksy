import { Inject } from "@nestjs/common";
import { and, eq, gte, lt } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { tickets } from "../../../database/drizzle/schema/tickets.schema";
import { users } from "../../../database/drizzle/schema/users.schema";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IQueryOptions } from "../../../shared/types/query-options";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { IGetTicketPagedCurrentMonthRepository } from "./contracts/get-paged-current-month";
import { TicketPagedCurrentMonthModel } from "../models/ticket-paged-current-month";

const createdByUser = alias(users, "created_by_user");

export class GetTicketPagedCurrentMonthRepository implements IGetTicketPagedCurrentMonthRepository {
  @Inject(DATABASE_TOKENS.Drizzle)
  private db!: NodePgDatabase;

  async execute(options: IQueryOptions): Promise<IPagedResult<TicketPagedCurrentMonthModel>> {
    const { limit, offset } = buildPagedOptions(options);
    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, tickets);

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const currentMonthCondition = and(
      gte(tickets.createdAt, firstDayOfMonth),
      lt(tickets.createdAt, firstDayOfNextMonth),
    );

    const combinedCondition = and(whereCondition, softDeleteCondition, currentMonthCondition);

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

    const records = (await queryBuilder) as TicketPagedCurrentMonthModel[];
    const totalRecords = await this.db.$count(tickets, combinedCondition);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
