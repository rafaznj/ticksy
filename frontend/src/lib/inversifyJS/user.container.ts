import { ActivateUserRepository } from "@/modules/user/repositories/activate.repository";
import type { IActivateUserRepository } from "@/modules/user/repositories/contracts/activate";
import type { ICreateUserRepository } from "@/modules/user/repositories/contracts/create";
import type { IInviteUserRepository } from "@/modules/user/repositories/contracts/invite";
import type { IConfirmPasswordRepository } from "@/modules/user/repositories/contracts/confirm-password";
import type { IDeactivateUserRepository } from "@/modules/user/repositories/contracts/deactivate";
import type { IGetAssignableUsersPagedRepository } from "@/modules/user/repositories/contracts/get-assignable-paged";
import type { IGetUserByEmailRepository } from "@/modules/user/repositories/contracts/get-by-email";
import type { IGetUserByIdRepository } from "@/modules/user/repositories/contracts/get-by-id";
import type { IGetUserPagedRepository } from "@/modules/user/repositories/contracts/get-paged";
import type { IUpdateUserRepository } from "@/modules/user/repositories/contracts/update";
import { CreateUserRepository } from "@/modules/user/repositories/create.repository";
import { InviteUserRepository } from "@/modules/user/repositories/invite.repository";
import { ConfirmPasswordRepository } from "@/modules/user/repositories/confirm-password.repository";
import { DeactivateUserRepository } from "@/modules/user/repositories/deactivate.repository";
import { GetAssignableUsersPagedRepository } from "@/modules/user/repositories/get-assignable-paged.repository";
import { GetUserByEmailRepository } from "@/modules/user/repositories/get-by-email.repository";
import { GetUserByIdRepository } from "@/modules/user/repositories/get-by-id.repository";
import { GetUserPagedRepository } from "@/modules/user/repositories/get-paged.repository";
import { UpdateUserRepository } from "@/modules/user/repositories/update.repository";
import { ActivateUserService } from "@/modules/user/services/activate.service";
import type { IActivateUserService } from "@/modules/user/services/contracts/activate";
import type { ICreateUserService } from "@/modules/user/services/contracts/create";
import type { IInviteUserService } from "@/modules/user/services/contracts/invite";
import type { IConfirmPasswordService } from "@/modules/user/services/contracts/confirm-password";
import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import type { IGetAssignableUsersPagedService } from "@/modules/user/services/contracts/get-assignable-paged";
import type { IGetUserByEmailService } from "@/modules/user/services/contracts/get-by-email";
import type { IGetUserByIdService } from "@/modules/user/services/contracts/get-by-id";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import { CreateUserService } from "@/modules/user/services/create.service";
import { InviteUserService } from "@/modules/user/services/invite.service";
import { ConfirmPasswordService } from "@/modules/user/services/confirm-password.service";
import { DeactivateUserService } from "@/modules/user/services/deactivate.service";
import { GetAssignableUsersPagedService } from "@/modules/user/services/get-assignable-paged.service";
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
  bind<IInviteUserService>(SERVICE_TOKENS.InviteUserService).to(InviteUserService);
  bind<IInviteUserRepository>(REPOSITORY_TOKENS.InviteUserRepository).to(InviteUserRepository);
  bind<IConfirmPasswordService>(SERVICE_TOKENS.ConfirmPasswordService).to(ConfirmPasswordService);
  bind<IConfirmPasswordRepository>(REPOSITORY_TOKENS.ConfirmPasswordRepository).to(
    ConfirmPasswordRepository,
  );

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

  bind<IGetAssignableUsersPagedService>(SERVICE_TOKENS.GetAssignableUsersPagedService).to(
    GetAssignableUsersPagedService,
  );
  bind<IGetAssignableUsersPagedRepository>(REPOSITORY_TOKENS.GetAssignableUsersPagedRepository).to(
    GetAssignableUsersPagedRepository,
  );

  bind<IUpdateUserService>(SERVICE_TOKENS.UpdateUserService).to(UpdateUserService);
  bind<IUpdateUserRepository>(REPOSITORY_TOKENS.UpdateUserRepository).to(UpdateUserRepository);

  bind<IActivateUserService>(SERVICE_TOKENS.ActivateUserService).to(ActivateUserService);
  bind<IActivateUserRepository>(REPOSITORY_TOKENS.ActivateUserRepository).to(
    ActivateUserRepository,
  );

  bind<IDeactivateUserService>(SERVICE_TOKENS.DeactivateUserService).to(DeactivateUserService);
  bind<IDeactivateUserRepository>(REPOSITORY_TOKENS.DeactivateUserRepository).to(
    DeactivateUserRepository,
  );
});
