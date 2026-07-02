import { user } from "../../../database/drizzle/schema/user.schema";

export type User = typeof user.$inferSelect;
