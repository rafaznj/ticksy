import { Inject, Injectable } from "@nestjs/common";
import { desc, eq, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { notificationRecipients, notifications } from "../../../database/drizzle/schema";
import { DATABASE_TOKENS } from "../../../database/tokens";
import type { IPagedResult } from "../../../shared/types/paged-result";
import type { IQueryOptions } from "../../../shared/types/query-options";
import buildPagedOptions from "../../../shared/utils/build-paged-options";
import buildPagedReturn from "../../../shared/utils/build-paged-return";
import type { NotificationModel } from "../models/notification-model";
import type { IGetNotificationPagedRepository } from "./contracts/get-paged";

@Injectable()
export class GetNotificationPagedRepository implements IGetNotificationPagedRepository {
  constructor(
    @Inject(DATABASE_TOKENS.Drizzle)
    private readonly db: NodePgDatabase,
  ) {}

  async execute(userId: string, options: IQueryOptions): Promise<IPagedResult<NotificationModel>> {
    const { limit, offset } = buildPagedOptions(options);
    const where = eq(notificationRecipients.userId, userId);

    const records = await this.db
      .select({
        id: notifications.id,
        type: notifications.type,
        ticketId: notifications.ticketId,
        parameters: notifications.parameters,
        createdAt: notifications.createdAt,
        read: sql<boolean>`${notificationRecipients.readAt} is not null`,
      })
      .from(notificationRecipients)
      .innerJoin(notifications, eq(notificationRecipients.notificationId, notifications.id))
      .where(where)
      .orderBy(desc(notifications.createdAt), desc(notifications.id))
      .limit(limit)
      .offset(offset);

    const totalRecords = await this.db.$count(notificationRecipients, where);

    return buildPagedReturn(records, limit, totalRecords);
  }
}
