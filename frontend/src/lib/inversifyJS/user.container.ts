import type { ICreateUserRepository } from "@/modules/user/repositories/contracts/create";
import type { IDeactivateUserRepository } from "@/modules/user/repositories/contracts/deactivate";
import type { IGetUserByEmailRepository } from "@/modules/user/repositories/contracts/get-by-email";
import type { IGetUserByIdRepository } from "@/modules/user/repositories/contracts/get-by-id";
import type { IGetUserPagedRepository } from "@/modules/user/repositories/contracts/get-paged";
import type { IUpdateUserRepository } from "@/modules/user/repositories/contracts/update";
import { CreateUserRepository } from "@/modules/user/repositories/create.repository";
import { DeactivateUserRepository } from "@/modules/user/repositories/deactivate.repository";
import { GetUserByEmailRepository } from "@/modules/user/repositories/get-by-email.repository";
import { GetUserByIdRepository } from "@/modules/user/repositories/get-by-id.repository";
import { GetUserPagedRepository } from "@/modules/user/repositories/get-paged.repository";
import { UpdateUserRepository } from "@/modules/user/repositories/update.repository";
import type { ICreateUserService } from "@/modules/user/services/contracts/create";
import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import type { IGetUserByEmailService } from "@/modules/user/services/contracts/get-by-email";
import type { IGetUserByIdService } from "@/modules/user/services/contracts/get-by-id";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import { CreateUserService } from "@/modules/user/services/create.service";
import { DeactivateUserService } from "@/modules/user/services/deactivate.service";
import { GetUserByEmailService } from "@/modules/user/services/get-by-email.service";
import { GetUserByIdService } from "@/modules/user/services/get-by-id.service";
import { GetUserPagedService } from "@/modules/user/services/get-paged.service";
import { UpdateUserService } from "@/modules/user/services/update.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

export const userContainerModule = new ContainerModule(({ bind }: ContainerModuleLoadOptions) => {
  bind<ICreateUserService>(SERVICE_TOKENS.CreateUserService).to(CreateUserService);
  bind<ICreateUserRepository>(REPOSITORY_TOKENS.CreateUserRepository).to(CreateUserRepository);

  bind<IGetUserByIdService>(SERVICE_TOKENS.GetUserByIdService).to(GetUserByIdService);
  bind<IGetUserByIdRepository>(REPOSITORY_TOKENS.GetUserByIdRepository).to(GetUserByIdRepository);

  bind<IGetUserByEmailService>(SERVICE_TOKENS.GetUserByEmailService).to(GetUserByEmailService);
  bind<IGetUserByEmailRepository>(REPOSITORY_TOKENS.GetUserByEmailRepository).to(
    GetUserByEmailRepository,
  );

  bind<IGetUserPagedService>(SERVICE_TOKENS.GetUserPagedService).to(GetUserPagedService);
  bind<IGetUserPagedRepository>(REPOSITORY_TOKENS.GetUserPagedRepository).to(
    GetUserPagedRepository,
  );

  bind<IUpdateUserService>(SERVICE_TOKENS.UpdateUserService).to(UpdateUserService);
  bind<IUpdateUserRepository>(REPOSITORY_TOKENS.UpdateUserRepository).to(UpdateUserRepository);

  bind<IDeactivateUserService>(SERVICE_TOKENS.DeactivateUserService).to(DeactivateUserService);
  bind<IDeactivateUserRepository>(REPOSITORY_TOKENS.DeactivateUserRepository).to(
    DeactivateUserRepository,
  );
});
