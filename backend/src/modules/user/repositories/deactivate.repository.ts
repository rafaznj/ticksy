import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DATABASE_TOKENS } from "../../../database/tokens";
import { user } from "../../../database/drizzle/schema/user.schema";
import { IDeactivateUserRepository } from "./contracts/deactivate";

@Injectable()
export class DeactivateUserRepository implements IDeactivateUserRepository {
  @Inject(DATABASE_TOKENS.Drizzle)
  private readonly db!: NodePgDatabase;

  async execute(id: string): Promise<boolean> {
    const result = await this.db
      .update(user)
      .set({
        deleted: true,
      })
      .where(eq(user.id, id));

    return !!result.rowCount;
  }
}
