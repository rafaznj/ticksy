import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { users } from "../../../database/drizzle/schema";
import { DATABASE_TOKENS } from "../../../database/tokens";
import type { UserRoleEnum } from "../enums/role.enum";
import { IGetUserIdsByRoleRepository } from "./contracts/get-ids-by-role";

@Injectable()
export class GetUserIdsByRoleRepository implements IGetUserIdsByRoleRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(role: UserRoleEnum): Promise<string[]> {
    const rows = await this.db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.role, role), eq(users.deleted, false)));

    return rows.map((row) => row.id);
  }
}
