import { Inject, Injectable } from "@nestjs/common";
import { and, eq, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { notificationRecipients } from "../../../database/drizzle/schema";
import { DATABASE_TOKENS } from "../../../database/tokens";
import type { IMarkNotificationAsReadRepository } from "./contracts/mark-as-read";

@Injectable()
export class MarkNotificationAsReadRepository implements IMarkNotificationAsReadRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(notificationId: string, userId: string): Promise<boolean> {
    const result = await this.db
      .update(notificationRecipients)
      .set({ readAt: sql`coalesce(${notificationRecipients.readAt}, now())` })
      .where(
        and(
          eq(notificationRecipients.notificationId, notificationId),
          eq(notificationRecipients.userId, userId),
        ),
      );

    return (result.rowCount ?? 0) > 0;
  }
}
