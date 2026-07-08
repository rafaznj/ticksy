import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { TicketPriorityEnum } from "../../../modules/ticket/enums/ticket-priority.enum";
import { user } from "./user.schema";
import { TicketStatusEnum } from "../../../modules/ticket/enums/ticket-status.enum";

export const ticketStatusEnum = pgEnum(
  "ticket_status",
  Object.values(TicketStatusEnum) as [TicketStatusEnum, ...TicketStatusEnum[]],
);

export const ticketPriorityEnum = pgEnum(
  "ticket_priority",
  Object.values(TicketPriorityEnum) as [TicketPriorityEnum, ...TicketPriorityEnum[]],
);

export const ticket = pgTable("ticket", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  priority: ticketPriorityEnum().notNull(),
  status: ticketStatusEnum().default(TicketStatusEnum.OPEN).notNull(),
  createdById: uuid("created_by_id")
    .references(() => user.id)
    .notNull(),
  assignedToId: uuid("assigned_to_id").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("update_at")
    .defaultNow()
    .$onUpdate(() => sql`now()`)
    .notNull(),
});
