import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { TicketPriorityEnum } from "../../../modules/ticket/enums/ticket-priority.enum";
import { users } from "./users.schema";
import { TicketStatusEnum } from "../../../modules/ticket/enums/ticket-status.enum";
import { TicketCategoryEnum } from "../../../modules/ticket/enums/ticket-category.enum";

export const ticketStatusEnum = pgEnum(
  "ticket_status",
  Object.values(TicketStatusEnum) as [TicketStatusEnum, ...TicketStatusEnum[]],
);

export const ticketPriorityEnum = pgEnum(
  "ticket_priority",
  Object.values(TicketPriorityEnum) as [TicketPriorityEnum, ...TicketPriorityEnum[]],
);

export const ticketCategoryEnum = pgEnum(
  "ticket_category",
  Object.values(TicketCategoryEnum) as [TicketCategoryEnum, ...TicketCategoryEnum[]],
);

export const tickets = pgTable("tickets", {
  id: uuid().defaultRandom().primaryKey(),
  code: integer().notNull().unique().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  category: ticketCategoryEnum().notNull(),
  priority: ticketPriorityEnum().notNull(),
  status: ticketStatusEnum().default(TicketStatusEnum.OPEN).notNull(),
  createdById: uuid("created_by_id")
    .references(() => users.id)
    .notNull(),
  assignedToId: uuid("assigned_to_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("update_at")
    .defaultNow()
    .$onUpdate(() => sql`now()`)
    .notNull(),
});
