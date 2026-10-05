import { Inject, Injectable } from "@nestjs/common";
import { and, eq, isNull } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { notificationRecipients } from "../../../database/drizzle/schema";
import { DATABASE_TOKENS } from "../../../database/tokens";
import type { IGetUnreadNotificationCountRepository } from "./contracts/get-unread-count";

@Injectable()
export class GetUnreadNotificationCountRepository implements IGetUnreadNotificationCountRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(userId: string): Promise<number> {
    return this.db.$count(
      notificationRecipients,
      and(eq(notificationRecipients.userId, userId), isNull(notificationRecipients.readAt)),
    );
  }
}
