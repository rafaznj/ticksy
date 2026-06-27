import "dotenv/config";

export const databaseConfig = {
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME!,
  user: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
};
