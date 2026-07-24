import { ilike, getTableColumns } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

export const customLike = (columnsComparison: string[], search: string, table: PgTable) => {
  const columns = getTableColumns(table);

  return columnsComparison
    .filter((col) => col in columns)
    .map((col) => ilike(columns[col as keyof typeof columns], `%${search}%`));
};
