import { Inject, Injectable } from "@nestjs/common";
import { and, eq, isNull, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { notificationRecipients } from "../../../database/drizzle/schema";
import { DATABASE_TOKENS } from "../../../database/tokens";
import type { IMarkAllNotificationsAsReadRepository } from "./contracts/mark-all-as-read";

@Injectable()
export class MarkAllNotificationsAsReadRepository implements IMarkAllNotificationsAsReadRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(userId: string): Promise<boolean> {
    const result = await this.db
      .update(notificationRecipients)
      .set({ readAt: sql`now()` })
      .where(and(eq(notificationRecipients.userId, userId), isNull(notificationRecipients.readAt)));

    return (result.rowCount ?? 0) > 0;
  }
}
