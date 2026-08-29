import { Module } from "@nestjs/common";
import { DrizzleModule } from "../../database/drizzle/drizzle.module";
import { REPOSITORY_TOKENS } from "../../shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "../../shared/di/tokens.services";
import { UserController } from "./controllers/user.controller";
import { CreateUserRepository } from "./repositories/create.repository";
import { CreateUserService } from "./services/create.service";
import { DeactivateUserService } from "./services/deactivate.service";
import { UpdateUserService } from "./services/update.service";
import { UpdateUserRepository } from "./repositories/update.repository";
import { GetUserByIdRepository } from "./repositories/get-by-id.repository";
import { GetUserByIdService } from "./services/get-by-id.service";
import { DeactivateUserRepository } from "./repositories/deactivate.repository";
import GetUserByEmailService from "./services/get-by-email.service";
import { GetUserByEmailRepository } from "./repositories/get-by-email.repository";
import { GetUserPagedRepository } from "./repositories/get-paged.repository";
import { GetUserPagedService } from "./services/get-paged.service";
import { CreateDefaultUsersService } from "./services/create-default-users.service";
import { GetAssignableUsersPagedService } from "./services/get-assignable-paged.service";
import { GetAssignableUsersPagedRepository } from "./repositories/get-assignable-paged.repository";
import { ActivateUserService } from "./services/activate.service";
import { ActivateUserRepository } from "./repositories/activate.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    {
      provide: SERVICE_TOKENS.CreateUserService,
      useClass: CreateUserService,
    },
    {
      provide: SERVICE_TOKENS.CreateDefaultUsersService,
      useClass: CreateDefaultUsersService,
    },
    {
      provide: REPOSITORY_TOKENS.CreateUserRepository,
      useClass: CreateUserRepository,
    },
    {
      provide: SERVICE_TOKENS.GetUserByIdService,
      useClass: GetUserByIdService,
    },
    {
      provide: REPOSITORY_TOKENS.GetUserByIdRepository,
      useClass: GetUserByIdRepository,
    },
    {
      provide: SERVICE_TOKENS.GetUserByEmailService,
      useClass: GetUserByEmailService,
    },
    {
      provide: REPOSITORY_TOKENS.GetUserByEmailRepository,
      useClass: GetUserByEmailRepository,
    },
    {
      provide: SERVICE_TOKENS.GetUserPagedService,
      useClass: GetUserPagedService,
    },
    {
      provide: REPOSITORY_TOKENS.GetUserPagedRepository,
      useClass: GetUserPagedRepository,
    },
    {
      provide: SERVICE_TOKENS.GetAssignableUsersPagedService,
      useClass: GetAssignableUsersPagedService,
    },
    {
      provide: REPOSITORY_TOKENS.GetAssignableUsersPagedRepository,
      useClass: GetAssignableUsersPagedRepository,
    },
    {
      provide: SERVICE_TOKENS.UpdateUserService,
      useClass: UpdateUserService,
    },
    {
      provide: REPOSITORY_TOKENS.UpdateUserRepository,
      useClass: UpdateUserRepository,
    },
    {
      provide: SERVICE_TOKENS.DeactivateUserService,
      useClass: DeactivateUserService,
    },
    {
      provide: REPOSITORY_TOKENS.DeactivateUserRepository,
      useClass: DeactivateUserRepository,
    },
    {
      provide: SERVICE_TOKENS.ActivateUserService,
      useClass: ActivateUserService,
    },
    {
      provide: REPOSITORY_TOKENS.ActivateUserRepository,
      useClass: ActivateUserRepository,
    },
  ],
  exports: [
    SERVICE_TOKENS.CreateDefaultUsersService,
    SERVICE_TOKENS.CreateUserService,
    SERVICE_TOKENS.GetUserByIdService,
    SERVICE_TOKENS.GetUserByEmailService,
  ],
})
export class UserModule {}
