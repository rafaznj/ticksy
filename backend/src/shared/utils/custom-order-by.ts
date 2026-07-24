import { asc, desc, getTableColumns } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { IQueryOptions } from "../types/query-options";

export const customOrderBy = (options: IQueryOptions, table: PgTable) => {
  const columns = getTableColumns(table);

  const sortColumn =
    options.sort && options.sort in columns
      ? columns[options.sort as keyof typeof columns]
      : (columns.createdAt ?? columns.created_at);

  if (!sortColumn) return undefined;

  return options.order === "desc" ? desc(sortColumn) : asc(sortColumn);
};
