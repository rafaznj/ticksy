import { like, sql } from "drizzle-orm";

const customLike = (columnsComparison: string[], search: string, tableName?: string) => {
  return columnsComparison.map((col) =>
    like(
      sql.raw(`lower(${tableName ? `${tableName}.${col}` : col})`),
      sql.raw(`lower('%${search}%')`),
    ),
  );
};

export { customLike };
