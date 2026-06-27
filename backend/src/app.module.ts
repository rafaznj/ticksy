import { Module } from "@nestjs/common";
import { DrizzleModule } from "./database/drizzle/drizzle.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthController } from "./modules/auth/controllers/auth.controller";
import { TicketModule } from "./modules/ticket/ticket.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [DrizzleModule, TicketModule, UserModule, AuthModule],
  controllers: [AuthController],
})
export class AppModule {}
