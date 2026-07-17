import { Inject } from "@nestjs/common";
import { and } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgTable } from "drizzle-orm/pg-core";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { IGetPagedRepository } from "./contracts/get-paged";
import { IPagedResult } from "../../types/paged-result";
import { IQueryOptions } from "../../types/query-options";
import buildPagedOptions from "../../utils/build-paged-options";
import { customQueryConditions } from "../../utils/custom-conditions";
import buildPagedReturn from "../../utils/build-paged-return";

export class GetPagedRepository<T> implements IGetPagedRepository<T> {
  @Inject(DATABASE_TOKENS.Drizzle)
  protected db!: NodePgDatabase;
  constructor(private readonly table: PgTable) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<T>> {
    const { limit, offset } = buildPagedOptions(options);

    const { softDeleteCondition, sort, whereCondition } = customQueryConditions(
      options,
      this.table,
    );

    const queryBuilder = this.db
      .select()
      .from(this.table)
      .where(and(whereCondition, softDeleteCondition))
      .limit(limit)
      .offset(offset);

    if (sort) {
      queryBuilder.orderBy(sort);
    }

    const records = (await queryBuilder) as T[];
    const totalRecords = await this.db.$count(this.table);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
