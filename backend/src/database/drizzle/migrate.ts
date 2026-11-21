import path from "node:path";

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { databaseConfig } from "../config";
import { relations } from "./schema/relations";

const pool = new Pool(databaseConfig);

async function main() {
  const db = drizzle({
    client: pool,
    relations,
  });

  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), "src/database/drizzle/migrations"),
  });

  await pool.end();

  console.log("Migrations executed successfully.");
}

main().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
