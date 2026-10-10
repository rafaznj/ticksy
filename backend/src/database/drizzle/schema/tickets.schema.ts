import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { TicketPriorityEnum } from "../../../modules/ticket/enums/ticket-priority.enum";
import { users } from "./users.schema";
import { TicketStatusEnum } from "../../../modules/ticket/enums/ticket-status.enum";
import { TicketCategoryEnum } from "../../../modules/ticket/enums/ticket-category.enum";
import { toPgEnum } from "../utils/to-pg-enum";

export const ticketStatusEnum = toPgEnum("ticket_status", TicketStatusEnum);

export const ticketPriorityEnum = toPgEnum("ticket_priority", TicketPriorityEnum);

export const ticketCategoryEnum = toPgEnum("ticket_category", TicketCategoryEnum);

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
