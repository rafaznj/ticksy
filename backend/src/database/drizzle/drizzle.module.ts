import { Global, Module } from "@nestjs/common";

import { drizzleProvider } from "./provider";

@Global()
@Module({
  providers: drizzleProvider,
  exports: drizzleProvider,
})
export class DrizzleModule {}
