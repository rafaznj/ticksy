import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { notificationRecipients, notifications } from "../../../database/drizzle/schema";
import { DATABASE_TOKENS } from "../../../database/tokens";
import type { NotificationEntity } from "../entity/notification.entity";
import type { ICreateNotificationRepository } from "./contracts/create";
import { CreateNotificationData } from "../data/create-notification.data";

@Injectable()
export class CreateNotificationRepository implements ICreateNotificationRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(data: CreateNotificationData): Promise<NotificationEntity> {
    return this.db.transaction(async (tx) => {
      const [notification] = await tx
        .insert(notifications)
        .values({
          type: data.type,
          ticketId: data.ticketId ?? null,
          parameters: data.parameters ?? null,
        })
        .returning();

      await tx
        .insert(notificationRecipients)
        .values(data.userIds.map((userId) => ({ notificationId: notification.id, userId })));

      return notification;
    });
  }
}
