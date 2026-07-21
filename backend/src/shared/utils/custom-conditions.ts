import { eq, getTableColumns, or } from "drizzle-orm";
import { customLike } from "./custom-like";
import { customOrderBy } from "./custom-order-by";
import { IQueryOptions } from "../types/query-options";
import { PgTable } from "drizzle-orm/pg-core";

export const customQueryConditions = (options: IQueryOptions, table: PgTable) => {
  const columns = getTableColumns(table);

  const softDeleteCondition =
    options.softDeleteFilter && "deleted" in columns ? eq(columns.deleted, false) : undefined;

  const whereCondition =
    options.search && options.columnsComparison && options.columnsComparison.length > 0
      ? or(...customLike(options.columnsComparison, options.search, table))
      : undefined;

  const sort = customOrderBy(options, table);

  return { softDeleteCondition, whereCondition, sort };
};
