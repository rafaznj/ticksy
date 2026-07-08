import { ticket } from "../../../database/drizzle/schema/ticket.schema";

export type Ticket = typeof ticket.$inferSelect;
