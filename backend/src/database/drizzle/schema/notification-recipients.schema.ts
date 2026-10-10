import { index, pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";

import { notifications } from "./notifications.schema";
import { users } from "./users.schema";

export const notificationRecipients = pgTable(
  "notification_recipients",
  {
    id: uuid().defaultRandom().primaryKey(),
    notificationId: uuid()
      .notNull()
      .references(() => notifications.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    readAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (t) => [unique().on(t.notificationId, t.userId), index().on(t.userId, t.readAt)],
);
