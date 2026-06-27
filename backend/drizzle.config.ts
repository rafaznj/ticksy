import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/drizzle/schema",
  out: "./src/infrastructure/database/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    database: process.env.DATABASE_NAME!,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
  },
  verbose: true,
  strict: true,
} satisfies Config;
