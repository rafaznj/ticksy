import type { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";

export type TableWithId = PgTable & { id: AnyPgColumn };
