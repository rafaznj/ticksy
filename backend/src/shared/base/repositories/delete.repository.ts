import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKENS } from "../../../database/tokens";
import { TableWithId } from "../../types/table-with-id.type";
import { IBaseDeleteRepository } from "./contracts/delete";

export class BaseDeleteRepository implements IBaseDeleteRepository {
  @Inject(DATABASE_TOKENS.Drizzle)
  protected db!: NodePgDatabase;
  constructor(private readonly table: TableWithId) {}

  async execute(id: string): Promise<boolean> {
    const result = await this.db.delete(this.table).where(eq(this.table.id, id));
    return !!result.rowCount;
  }
}
