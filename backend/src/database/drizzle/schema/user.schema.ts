import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserRoleEnum } from "../../../modules/user/enums/roles.enum";

export const userRoleEnum = pgEnum(
  "role",
  Object.values(UserRoleEnum) as [UserRoleEnum, ...UserRoleEnum[]],
);

export const user = pgTable("user", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 254 }).notNull(),
  password: text().notNull(),
  role: userRoleEnum().default(UserRoleEnum.EMPLOYEE).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`now()`)
    .notNull(),
});
