import { Inject } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgTable } from "drizzle-orm/pg-core";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { IBaseCreateRepository } from "./contracts/create";

export class BaseCreateRepository<TInput, TOutput> implements IBaseCreateRepository<
  TInput,
  TOutput
> {
  @Inject(DATABASE_TOKENS.Drizzle)
  protected db!: NodePgDatabase;
  constructor(private readonly table: PgTable) {}

  async execute(data: TInput): Promise<TOutput | null> {
    const [created] = await this.db
      .insert(this.table)
      .values([{ ...data }])
      .returning();

    return (created as TOutput) ?? null;
  }
}
