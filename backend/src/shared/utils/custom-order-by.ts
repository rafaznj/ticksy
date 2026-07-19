import { asc, desc, sql } from "drizzle-orm";
import { IQueryOptions } from "../types/query-options";

export const customOrderBy = (options: IQueryOptions, tableName?: string) => {
  if (options.order && options.sort) {
    return options.order === "desc"
      ? tableName
        ? desc(sql.raw(`${tableName}.${options.sort}`))
        : desc(sql.identifier(options.sort))
      : tableName
        ? asc(sql.raw(`${tableName}.${options.sort}`))
        : asc(sql.identifier(options.sort));
  }

  return tableName ? asc(sql.raw(`${tableName}.created_at`)) : asc(sql.identifier("created_at"));
};
