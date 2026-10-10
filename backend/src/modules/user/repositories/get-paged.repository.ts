import { and, eq, getTableColumns } from "drizzle-orm";
import { users } from "../../../database/drizzle/schema";
import { BaseGetPagedRepository } from "../../../shared/base/repositories/get-paged.repository";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import { customQueryConditions } from "../../../shared/utils/custom-conditions";
import { UserViewModel } from "../view-models/user.vm";
import { IGetUserPagedRepository } from "./contracts/get-paged";
import { IUserQueryOptions } from "../data/query-options.data";
import { IPagedResult } from "../../../shared/interfaces/paged-result";

export class GetUserPagedRepository
  extends BaseGetPagedRepository<UserViewModel>
  implements IGetUserPagedRepository
{
  constructor() {
    super(users);
  }

  async execute(options: IUserQueryOptions): Promise<IPagedResult<UserViewModel>> {
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

    const records = (await queryBuilder) as UserViewModel[];
    const totalRecords = await this.db.$count(users, finalWhere);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
