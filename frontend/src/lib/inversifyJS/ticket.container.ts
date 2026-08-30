import { AssignTicketRepository } from "@/modules/ticket/repositories/assign.repository";
import type { IAssignTicketRepository } from "@/modules/ticket/repositories/contracts/assign";
import type { ICreateTicketRepository } from "@/modules/ticket/repositories/contracts/create";
import type { IDeleteTicketRepository } from "@/modules/ticket/repositories/contracts/delete";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";
import type { IGetTicketPagedCurrentMonthRepository } from "@/modules/ticket/repositories/contracts/get-paged-current-month";
import type { IGetTicketPagedWithScopeRepository } from "@/modules/ticket/repositories/contracts/get-paged-with-scope";
import type { IResolvedTicketRepository } from "@/modules/ticket/repositories/contracts/resolved";
import type { IUnassignTicketRepository } from "@/modules/ticket/repositories/contracts/unassign";
import type { IUpdateTicketRepository } from "@/modules/ticket/repositories/contracts/update";
import { CreateTicketRepository } from "@/modules/ticket/repositories/create.repository";
import { DeleteTicketRepository } from "@/modules/ticket/repositories/delete.repository";
import { GetTicketByIdRepository } from "@/modules/ticket/repositories/get-by-id.repository";
import { GetTicketPagedCurrentMonthRepository } from "@/modules/ticket/repositories/get-paged-current-month.repository.ts";
import { GetTicketPagedWithScopeRepository } from "@/modules/ticket/repositories/get-paged-with-scope.repository";
import { ResolvedTicketRepository } from "@/modules/ticket/repositories/resolved.repository";
import { UnassignTicketRepository } from "@/modules/ticket/repositories/unassign.repository";
import { UpdateTicketRepository } from "@/modules/ticket/repositories/update.repository";
import { AssignTicketService } from "@/modules/ticket/services/assign.service";
import type { IAssignTicketService } from "@/modules/ticket/services/contracts/assign";
import type { ICreateTicketService } from "@/modules/ticket/services/contracts/create";
import type { IDeleteTicketService } from "@/modules/ticket/services/contracts/delete";
import type { IGetTicketByIdService } from "@/modules/ticket/services/contracts/get-by-id";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import type { IGetTicketPagedCurrentMonthService } from "@/modules/ticket/services/contracts/get-paged-current-month";
import type { IResolvedTicketService } from "@/modules/ticket/services/contracts/resolved";
import type { IUnassignTicketService } from "@/modules/ticket/services/contracts/unassign";
import type { IUpdateTicketService } from "@/modules/ticket/services/contracts/update";
import { CreateTicketService } from "@/modules/ticket/services/create.service";
import { DeleteTicketService } from "@/modules/ticket/services/delete.service";
import { GetTicketByIdService } from "@/modules/ticket/services/get-by-id.service";
import { GetTicketPagedCurrentMonthService } from "@/modules/ticket/services/get-paged-current-month.service";
import { GetTicketPagedWithScopeService } from "@/modules/ticket/services/get-paged-with-scope.service";
import { ResolvedTicketService } from "@/modules/ticket/services/resolved.service";
import { UnassignTicketService } from "@/modules/ticket/services/unassign.service";
import { UpdateTicketService } from "@/modules/ticket/services/update.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

export const ticketContainerModule = new ContainerModule(({ bind }: ContainerModuleLoadOptions) => {
  bind<ICreateTicketService>(SERVICE_TOKENS.CreateTicketService).to(CreateTicketService);
  bind<ICreateTicketRepository>(REPOSITORY_TOKENS.CreateTicketRepository).to(
    CreateTicketRepository,
  );

  bind<IGetTicketPagedWithScopeService>(SERVICE_TOKENS.GetTicketPagedWithScopeService).to(
    GetTicketPagedWithScopeService,
  );
  bind<IGetTicketPagedWithScopeRepository>(REPOSITORY_TOKENS.GetTicketPagedWithScopeRepository).to(
    GetTicketPagedWithScopeRepository,
  );

  bind<IGetTicketPagedCurrentMonthService>(SERVICE_TOKENS.GetTicketPagedCurrentMonthService).to(
    GetTicketPagedCurrentMonthService,
  );
  bind<IGetTicketPagedCurrentMonthRepository>(
    REPOSITORY_TOKENS.GetTicketPagedCurrentMonthRepository,
  ).to(GetTicketPagedCurrentMonthRepository);

  bind<IGetTicketByIdService>(SERVICE_TOKENS.GetTicketByIdService).to(GetTicketByIdService);
  bind<IGetTicketByIdRepository>(REPOSITORY_TOKENS.GetTicketByIdRepository).to(
    GetTicketByIdRepository,
  );

  bind<IUpdateTicketService>(SERVICE_TOKENS.UpdateTicketService).to(UpdateTicketService);
  bind<IUpdateTicketRepository>(REPOSITORY_TOKENS.UpdateTicketRepository).to(
    UpdateTicketRepository,
  );

  bind<IDeleteTicketService>(SERVICE_TOKENS.DeleteTicketService).to(DeleteTicketService);
  bind<IDeleteTicketRepository>(REPOSITORY_TOKENS.DeleteTicketRepository).to(
    DeleteTicketRepository,
  );

  bind<IAssignTicketService>(SERVICE_TOKENS.AssignTicketService).to(AssignTicketService);
  bind<IAssignTicketRepository>(REPOSITORY_TOKENS.AssignTicketRepository).to(
    AssignTicketRepository,
  );

  bind<IUnassignTicketService>(SERVICE_TOKENS.UnassignTicketService).to(UnassignTicketService);
  bind<IUnassignTicketRepository>(REPOSITORY_TOKENS.UnassignTicketRepository).to(
    UnassignTicketRepository,
  );

  bind<IResolvedTicketService>(SERVICE_TOKENS.ResolvedTicketService).to(ResolvedTicketService);
  bind<IResolvedTicketRepository>(REPOSITORY_TOKENS.ResolvedTicketRepository).to(
    ResolvedTicketRepository,
  );
});
