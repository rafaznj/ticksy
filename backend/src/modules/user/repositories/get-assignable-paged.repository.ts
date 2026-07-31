import { Inject } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { user } from "../../../database/drizzle/schema";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IQueryOptions } from "../../../shared/types/query-options";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { UserModel } from "../models/user-model";
import { IGetAssignableUsersPagedRepository } from "./contracts/get-assignable-paged";
import { UserRoleEnum } from "../enums/roles.enum";

export class GetAssignableUsersPagedRepository implements IGetAssignableUsersPagedRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    protected db: NodePgDatabase,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<UserModel>> {
    const { limit, offset } = buildPagedOptions(options);

    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, user);

    const roleCondition = eq(user.role, UserRoleEnum.TECHNICAL_ASSISTANCE);

    const finalWhere = and(whereCondition, softDeleteCondition, roleCondition);

    const queryBuilder = this.db.select().from(user).where(finalWhere).limit(limit).offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as UserModel[];
    const totalRecords = await this.db.$count(user, finalWhere);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
