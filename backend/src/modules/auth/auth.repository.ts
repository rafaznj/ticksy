import { Inject, Injectable } from "@nestjs/common";
import { and, eq, isNull } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { user } from "../../database/drizzle/schema/user.schema";
import { refreshTokens } from "../../database/drizzle/schema/refresh-tokens.schema";
import { DATABASE_TOKENS } from "../../database/tokens";
import { IAuthRepository } from "./auth";

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async findByEmail(email: string) {
    const [result] = await this.db.select().from(user).where(eq(user.email, email));
    return result ?? null;
  }

  async findById(id: string) {
    const [result] = await this.db.select().from(user).where(eq(user.id, id));
    return result ?? null;
  }

  async saveRefreshToken(userId: string, tokenHash: string) {
    await this.db.insert(refreshTokens).values({
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }

  async findValidRefreshToken(userId: string) {
    const [result] = await this.db
      .select()
      .from(refreshTokens)
      .where(and(eq(refreshTokens.userId, userId), isNull(refreshTokens.revokedAt)));
    return result ?? null;
  }

  async revokeRefreshToken(userId: string) {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.userId, userId));
  }
}
