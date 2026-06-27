import { Inject } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgTable } from "drizzle-orm/pg-core";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { IBaseCreateRepository } from "./contracts/create";

export class BaseCreateRepository<T> implements IBaseCreateRepository<T> {
  @Inject(DATABASE_TOKENS.Drizzle)
  protected db!: NodePgDatabase;
  constructor(private readonly table: PgTable) {}

  async execute(data: T): Promise<T | null> {
    const recordsAdded = await this.db
      .insert(this.table)
      .values([{ ...data }])
      .returning();
    if (recordsAdded.length < 1) return null;
    return recordsAdded[0] as T;
  }
}
