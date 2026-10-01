import { Module } from "@nestjs/common";
import { TicketController } from "./controllers/ticket.controller";
import { SERVICE_TOKENS } from "../../shared/di/tokens.services";
import { REPOSITORY_TOKENS } from "../../shared/di/tokens.repositories";
import { CreateTicketRepository } from "./repositories/create.repository";
import { CreateTicketService } from "./services/create.service";
import { GetTicketByIdService } from "./services/get-by-id.service";
import { GetTicketByIdRepository } from "./repositories/get-by-id.repository";
import { UpdateTicketRepository } from "./repositories/update.repository";
import { UpdateTicketService } from "./services/update.service";
import { AssignTicketService } from "./services/assign.service";
import { ResolvedTicketService } from "./services/resolved.service";
import { DeleteTicketService } from "./services/delete.service";
import { DeleteTicketRepository } from "./repositories/delete.repository";
import { GetTicketPagedWithScopeService } from "./services/get-paged-with-scope.service";
import { GetTicketPagedWithScopeRepository } from "./repositories/get-paged-with-scope.repository";
import { AssignTicketRepository } from "./repositories/assign.repository";
import { ResolvedTicketRepository } from "./repositories/resolved.repository";
import { UnassignTicketService } from "./services/unassign.service";
import { UnassignTicketRepository } from "./repositories/unassign.repository";
import { GetTicketPagedLastSevenDaysRepository } from "./repositories/get-paged-last-seven-days.repository";
import { GetTicketStatusCountService } from "./services/get-status-count.service";
import { GetTicketStatusCountRepository } from "./repositories/get-status-count.repository";
import { GetTicketPagedLastSevenDaysService } from "./services/get-paged-last-seven-days";

@Module({
  controllers: [TicketController],
  providers: [
    {
      provide: SERVICE_TOKENS.CreateTicketService,
      useClass: CreateTicketService,
    },
    {
      provide: REPOSITORY_TOKENS.CreateTicketRepository,
      useClass: CreateTicketRepository,
    },
    {
      provide: SERVICE_TOKENS.GetTicketByIdService,
      useClass: GetTicketByIdService,
    },
    {
      provide: REPOSITORY_TOKENS.GetTicketByIdRepository,
      useClass: GetTicketByIdRepository,
    },
    {
      provide: SERVICE_TOKENS.GetTicketPagedWithScopeService,
      useClass: GetTicketPagedWithScopeService,
    },
    {
      provide: REPOSITORY_TOKENS.GetTicketPagedWithScopeRepository,
      useClass: GetTicketPagedWithScopeRepository,
    },
    {
      provide: SERVICE_TOKENS.GetTicketPagedLastSevenDaysService,
      useClass: GetTicketPagedLastSevenDaysService,
    },
    {
      provide: REPOSITORY_TOKENS.GetTicketPagedLastSevenDaysRepository,
      useClass: GetTicketPagedLastSevenDaysRepository,
    },
    {
      provide: SERVICE_TOKENS.UpdateTicketService,
      useClass: UpdateTicketService,
    },
    {
      provide: REPOSITORY_TOKENS.UpdateTicketRepository,
      useClass: UpdateTicketRepository,
    },
    {
      provide: SERVICE_TOKENS.DeleteTicketService,
      useClass: DeleteTicketService,
    },
    {
      provide: REPOSITORY_TOKENS.DeleteTicketRepository,
      useClass: DeleteTicketRepository,
    },
    {
      provide: SERVICE_TOKENS.AssignTicketService,
      useClass: AssignTicketService,
    },
    {
      provide: REPOSITORY_TOKENS.AssignTicketRepository,
      useClass: AssignTicketRepository,
    },
    {
      provide: SERVICE_TOKENS.UnassignTicketService,
      useClass: UnassignTicketService,
    },
    {
      provide: REPOSITORY_TOKENS.UnassignTicketRepository,
      useClass: UnassignTicketRepository,
    },
    {
      provide: SERVICE_TOKENS.ResolvedTicketService,
      useClass: ResolvedTicketService,
    },
    {
      provide: REPOSITORY_TOKENS.ResolvedTicketRepository,
      useClass: ResolvedTicketRepository,
    },
    {
      provide: SERVICE_TOKENS.GetTicketStatusCountService,
      useClass: GetTicketStatusCountService,
    },
    {
      provide: REPOSITORY_TOKENS.GetTicketStatusCountRepository,
      useClass: GetTicketStatusCountRepository,
    },
  ],
})
export class TicketModule {}
