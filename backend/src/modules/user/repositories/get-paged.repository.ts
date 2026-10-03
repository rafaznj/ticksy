import { and, eq, getTableColumns } from "drizzle-orm";
import { users } from "../../../database/drizzle/schema";
import { BaseGetPagedRepository } from "../../../shared/base/repositories/get-paged.repository";
import { IPagedResult } from "../../../shared/types/paged-result";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import { UserModel } from "../models/user-model";
import { IGetUserPagedRepository } from "./contracts/get-paged";
import { IUserQueryOptions } from "../types/user-query-options-paged";

export class GetUserPagedRepository
  extends BaseGetPagedRepository<UserModel>
  implements IGetUserPagedRepository
{
  constructor() {
    super(users);
  }

  async execute(options: IUserQueryOptions): Promise<IPagedResult<UserModel>> {
    const { limit, offset } = buildPagedOptions(options);

    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(options, users);

    const columns = getTableColumns(users);

    const deletedValue =
      typeof options.deleted === "boolean"
        ? options.deleted
        : options.deleted === "true"
          ? true
          : options.deleted === "false"
            ? false
            : undefined;

    const deletedCondition =
      deletedValue !== undefined && "deleted" in columns
        ? eq(columns.deleted, deletedValue)
        : undefined;

    const roleCondition = options.role ? eq(users.role, options.role) : undefined;

    const finalWhere = and(whereCondition, softDeleteCondition, deletedCondition, roleCondition);

    const queryBuilder = this.db.select().from(users).where(finalWhere).limit(limit).offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as UserModel[];
    const totalRecords = await this.db.$count(users, finalWhere);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
