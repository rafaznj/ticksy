import { Module } from "@nestjs/common";
import { DrizzleModule } from "./database/drizzle/drizzle.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TicketModule } from "./modules/ticket/ticket.module";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { jwtConfig } from "./shared/config/jwt.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    DrizzleModule,
    TicketModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
