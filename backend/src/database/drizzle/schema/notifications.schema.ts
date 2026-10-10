import { jsonb, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { NotificationTypeEnum } from "../../../modules/notification/enums/notification-type.enum";
import { tickets } from "./tickets.schema";
import { toPgEnum } from "../utils/to-pg-enum";

export const notificationTypeEnum = toPgEnum("notification_type", NotificationTypeEnum);

export const notifications = pgTable("notifications", {
  id: uuid().defaultRandom().primaryKey(),
  type: notificationTypeEnum().notNull(),
  ticketId: uuid().references(() => tickets.id, { onDelete: "cascade" }),
  parameters: jsonb().$type<Record<string, string>>(),
  createdAt: timestamp().defaultNow().notNull(),
});
