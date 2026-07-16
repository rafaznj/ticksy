import { user } from "../../../database/drizzle/schema/user.schema";

export type UserEntity = typeof user.$inferSelect;
