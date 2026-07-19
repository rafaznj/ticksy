import { eq, or } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { IQueryOptions } from "../types/query-options";
import { customLike } from "./custom-like";
import { customOrderBy } from "./custom-order-by";

const customQueryConditions = (options: IQueryOptions, table: PgTable, tableName?: string) => {
  const softDeleteCondition = options.softDeleteFilter
    ? eq((table as any).deleted, false)
    : undefined;

  const whereCondition =
    options.search && options.columnsComparison && options.columnsComparison.length > 0
      ? or(...customLike(options.columnsComparison, options.search))
      : undefined;

  const sort = customOrderBy(options, tableName);

  return {
    softDeleteCondition,
    whereCondition,
    sort,
  };
};

export { customQueryConditions };
