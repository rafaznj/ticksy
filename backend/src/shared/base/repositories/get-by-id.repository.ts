import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { TableWithId } from "../../types/table-with-id.type";
import { IBaseGetByIdRepository } from "./contracts/get-by-id";

export abstract class BaseGetByIdRepository<T> implements IBaseGetByIdRepository<T> {
  @Inject(DATABASE_TOKENS.Drizzle)
  protected db!: NodePgDatabase;
  constructor(private readonly table: TableWithId) {}

  async execute(id: string): Promise<T | null> {
    const [record] = (await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1)) as T[];

    return (record as T) ?? null;
  }
}
