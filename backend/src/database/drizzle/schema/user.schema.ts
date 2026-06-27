import { pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["employee", "admin", "technical_assistance"]);

export const user = pgTable("user", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 254 }).notNull(),
  password: text().notNull(),
  role: rolesEnum().default("employee").notNull(),
});
