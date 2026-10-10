import { Inject } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { users } from "../../../database/drizzle/schema";
import { IQueryOptions } from "../../../shared/interfaces/query-options";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { UserViewModel } from "../view-models/user.vm";
import { IGetAssignableUsersPagedRepository } from "./contracts/get-assignable-paged";
import { UserRoleEnum } from "../enums/role.enum";
import { IPagedResult } from "../../../shared/interfaces/paged-result";

export class GetAssignableUsersPagedRepository implements IGetAssignableUsersPagedRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<UserViewModel>> {
    const { limit, offset } = buildPagedOptions(options);

    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, users);

    const roleCondition = eq(users.role, UserRoleEnum.TECHNICAL_ASSISTANCE);

    const finalWhere = and(whereCondition, softDeleteCondition, roleCondition);

    const queryBuilder = this.db.select().from(users).where(finalWhere).limit(limit).offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as UserViewModel[];
    const totalRecords = await this.db.$count(users, finalWhere);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
