import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { TicketPriorityEnum, TicketStatusEnum } from "../../../modules/ticket/enums/ticket.enum";
import { user } from "./user.schema";

export const ticketStatusEnum = pgEnum(
  "ticket_status",
  Object.values(TicketStatusEnum) as [string, ...string[]],
);

export const ticketPriorityEnum = pgEnum(
  "ticket_priority",
  Object.values(TicketPriorityEnum) as [string, ...string[]],
);

export const ticket = pgTable("ticket", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  priority: ticketPriorityEnum().notNull(),
  status: ticketStatusEnum().default(TicketStatusEnum.OPEN).notNull(),
  createdById: uuid()
    .references(() => user.id)
    .notNull(),
  assignedToId: uuid().references(() => user.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`now()`)
    .notNull(),
  closedAt: timestamp(),
});
