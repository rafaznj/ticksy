import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { DrizzleModule } from "./database/drizzle/drizzle.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TicketModule } from "./modules/ticket/ticket.module";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { jwtConfig } from "./shared/config/jwt.config";
import { SERVICE_TOKENS } from "./shared/di/tokens.services";
import type { ICreateDefaultUsersService } from "./modules/user/services/contracts/create-default-users";

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
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(SERVICE_TOKENS.CreateDefaultUsersService)
    private readonly createDefaultUsersService: ICreateDefaultUsersService,
  ) {}

  async onModuleInit() {
    await this.createDefaultUsersService.execute();
  }
}
