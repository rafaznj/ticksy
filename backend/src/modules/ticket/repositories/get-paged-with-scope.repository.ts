import { Inject } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { tickets } from "../../../database/drizzle/schema/tickets.schema";
import { users } from "../../../database/drizzle/schema/users.schema";
import { IQueryOptions } from "../../../shared/interfaces/query-options";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { IGetTicketPagedWithScopeRepository } from "./contracts/get-paged-with-scope";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { TicketScopeViewModel } from "../view-models/scope.vm";
import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketCategoryEnum } from "../enums/ticket-category.enum";
import { IPagedResult } from "../../../shared/interfaces/paged-result";
import { TicketViewModel } from "../view-models/ticket.vm";

const createdByUser = alias(users, "created_by_user");
const assignedToUser = alias(users, "assigned_to_user");

export class GetTicketPagedWithScopeRepository implements IGetTicketPagedWithScopeRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(
    options: IQueryOptions,
    scope?: TicketScopeViewModel,
  ): Promise<IPagedResult<TicketViewModel>> {
    const { limit, offset } = buildPagedOptions(options);
    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, tickets);

    const scopeCondition = scope?.assignedToId
      ? eq(tickets.assignedToId, scope.assignedToId)
      : scope?.createdById
        ? eq(tickets.createdById, scope.createdById)
        : undefined;

    const statusCondition = options.status
      ? eq(tickets.status, options.status as TicketStatusEnum)
      : undefined;

    const priorityCondition = options.priority
      ? eq(tickets.priority, options.priority as TicketPriorityEnum)
      : undefined;

    const categoryCondition = options.category
      ? eq(tickets.category, options.category as TicketCategoryEnum)
      : undefined;

    const combinedCondition = and(
      whereCondition,
      softDeleteCondition,
      scopeCondition,
      statusCondition,
      priorityCondition,
      categoryCondition,
    );

    const queryBuilder = this.db
      .select({
        id: tickets.id,
        code: tickets.code,
        title: tickets.title,
        description: tickets.description,
        category: tickets.category,
        priority: tickets.priority,
        status: tickets.status,
        createdById: tickets.createdById,
        assignedToId: tickets.assignedToId,
        createdByName: createdByUser.name,
        assignedToName: assignedToUser.name,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
      })
      .from(tickets)
      .innerJoin(createdByUser, eq(tickets.createdById, createdByUser.id))
      .leftJoin(assignedToUser, eq(tickets.assignedToId, assignedToUser.id))
      .where(combinedCondition)
      .limit(limit)
      .offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as TicketViewModel[];
    const totalRecords = await this.db.$count(tickets, combinedCondition);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
