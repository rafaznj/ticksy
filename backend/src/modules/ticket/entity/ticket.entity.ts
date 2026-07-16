import { ticket } from "../../../database/drizzle/schema/ticket.schema";

export type TicketEntity = typeof ticket.$inferSelect;
