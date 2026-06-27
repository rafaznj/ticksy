import { Pool } from "pg";
import * as schema from "./schema";
export declare const drizzleProvider: {
    provide: symbol;
    useFactory: () => import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
        $client: Pool;
    };
}[];
