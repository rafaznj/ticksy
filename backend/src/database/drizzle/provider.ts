import { drizzle } from "drizzle-orm/node-postgres";

import { Pool } from "pg";
import { databaseConfig } from "../config";
import { DATABASE_TOKENS } from "../tokens";
import { relations } from "./schema/relations";

export const drizzleProvider = [
  {
    provide: DATABASE_TOKENS.Drizzle,
    useFactory: () => {
      const pool = new Pool(databaseConfig);
      return drizzle({
        client: pool,
        relations,
        logger: false,
      });
    },
  },
];
