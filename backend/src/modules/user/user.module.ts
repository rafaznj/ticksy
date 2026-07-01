import { Module } from "@nestjs/common";
import { DrizzleModule } from "../../database/drizzle/drizzle.module";
import { REPOSITORY_TOKENS } from "../../shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "../../shared/di/tokens.services";
import { UserController } from "./controllers/user.controller";
import { CreateUserRepository } from "./repositories/create.repository";
import { CreateUserService } from "./services/create.service";

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    {
      provide: SERVICE_TOKENS.CreateUserService,
      useClass: CreateUserService,
    },
    {
      provide: REPOSITORY_TOKENS.CreateUserRepository,
      useClass: CreateUserRepository,
    },
    
  ],
})
export class UserModule {}
