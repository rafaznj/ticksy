import { Inject } from "@nestjs/common";
import { and, eq, gte, lt } from "drizzle-orm";
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
import { IGetTicketPagedCurrentMonthRepository } from "./contracts/get-paged-current-month";
import { TicketPagedCurrentMonthModel } from "../models/ticket-paged-current-month";

const createdByUser = alias(user, "created_by_user");

export class GetTicketPagedCurrentMonthRepository implements IGetTicketPagedCurrentMonthRepository {
  @Inject(DATABASE_TOKENS.Drizzle)
  private db!: NodePgDatabase;

  async execute(options: IQueryOptions): Promise<IPagedResult<TicketPagedCurrentMonthModel>> {
    const { limit, offset } = buildPagedOptions(options);
    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, ticket);

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const currentMonthCondition = and(
      gte(ticket.createdAt, firstDayOfMonth),
      lt(ticket.createdAt, firstDayOfNextMonth),
    );

    const combinedCondition = and(whereCondition, softDeleteCondition, currentMonthCondition);

    const queryBuilder = this.db
      .select({
        id: ticket.id,
        title: ticket.title,
        createdByName: createdByUser.name,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
      })
      .from(ticket)
      .innerJoin(createdByUser, eq(ticket.createdById, createdByUser.id))
      .where(combinedCondition)
      .limit(limit)
      .offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as TicketPagedCurrentMonthModel[];
    const totalRecords = await this.db.$count(ticket, combinedCondition);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
