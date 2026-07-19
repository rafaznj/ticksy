import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DATABASE_TOKENS } from "../../../database/tokens";
import { TableWithId } from "../../types/table-with-id.type";
import { IBaseUpdateRepository } from "./contracts/update";

export class BaseUpdateRepository<T> implements IBaseUpdateRepository<T> {
  @Inject(DATABASE_TOKENS.Drizzle)
  protected db!: NodePgDatabase;

  constructor(private readonly table: TableWithId) {}

  async execute(id: string, data: Partial<T>): Promise<T | null> {
    const result = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return (result[0] as T) ?? null;
  }
}
