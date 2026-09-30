import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DATABASE_TOKENS } from "../../../database/tokens";
import { users } from "../../../database/drizzle/schema/users.schema";
import { IDeactivateUserRepository } from "./contracts/deactivate";

@Injectable()
export class ActivateUserRepository implements IDeactivateUserRepository {
  @Inject(DATABASE_TOKENS.Drizzle)
  private readonly db!: NodePgDatabase;

  async execute(id: string): Promise<boolean> {
    const result = await this.db
      .update(users)
      .set({
        deleted: false,
      })
      .where(eq(users.id, id));

    return !!result.rowCount;
  }
}
