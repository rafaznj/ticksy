import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DATABASE_TOKENS } from "../../../database/tokens";
import * as schema from "../../../database/drizzle/schema";

import { IGetUserByEmailRepository } from "./contracts/get-by-email";
import { UserModel } from "../models/user-model";

@Injectable()
export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async execute(email: string): Promise<UserModel | null> {
    const [user] = await this.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, email))
      .limit(1);

    return user ?? null;
  }
}
