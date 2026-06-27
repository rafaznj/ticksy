import { Module } from "@nestjs/common";

import { DATABASE_TOKENS } from "../tokens";
import { drizzleProvider } from "./provider";

@Module({
  providers: drizzleProvider,
  exports: [DATABASE_TOKENS.Drizzle],
})
export class DrizzleModule {}
