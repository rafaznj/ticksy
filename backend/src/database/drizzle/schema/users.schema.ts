import { sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserRoleEnum } from "../../../modules/user/enums/role.enum";
import { toPgEnum } from "../utils/to-pg-enum";

export const userRoleEnum = toPgEnum("user_role", UserRoleEnum);

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 254 }).notNull().unique(),
  password: text().notNull(),
  role: userRoleEnum().default(UserRoleEnum.EMPLOYEE).notNull(),
  deleted: boolean().default(false).notNull(),
  mustChangePassword: boolean("must_change_password").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => sql`now()`)
    .notNull(),
});
