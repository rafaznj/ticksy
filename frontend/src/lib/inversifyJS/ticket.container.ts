import type { ICreateTicketRepository } from "@/modules/ticket/repositories/contracts/create";
import type { IDeleteTicketRepository } from "@/modules/ticket/repositories/contracts/delete";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";
import type { IUpdateTicketRepository } from "@/modules/ticket/repositories/contracts/update";
import { CreateTicketRepository } from "@/modules/ticket/repositories/create.repository";
import { DeleteTicketRepository } from "@/modules/ticket/repositories/delete.repository";
import { GetTicketByIdRepository } from "@/modules/ticket/repositories/get-by-id.repository";
import { UpdateTicketRepository } from "@/modules/ticket/repositories/update.repository";
import type { ICreateTicketService } from "@/modules/ticket/services/contracts/create";
import type { IDeleteTicketService } from "@/modules/ticket/services/contracts/delete";
import type { IGetTicketByIdService } from "@/modules/ticket/services/contracts/get-by-id";
import type { IUpdateTicketService } from "@/modules/ticket/services/contracts/update";
import { CreateTicketService } from "@/modules/ticket/services/create.service";
import { DeleteTicketService } from "@/modules/ticket/services/delete.service";
import { GetTicketByIdService } from "@/modules/ticket/services/get-by-id.service";
import { UpdateTicketService } from "@/modules/ticket/services/update.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

export const ticketContainerModule = new ContainerModule(({ bind }: ContainerModuleLoadOptions) => {
  bind<ICreateTicketService>(SERVICE_TOKENS.CreateTicketService).to(CreateTicketService);
  bind<ICreateTicketRepository>(REPOSITORY_TOKENS.CreateTicketRepository).to(
    CreateTicketRepository,
  );

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
});
