import type { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";

export interface TableWithId extends PgTable {
  id: AnyPgColumn;
}
