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
import { ChangeTicketStatusService } from "./services/change-status.service";
import { DeleteTicketService } from "./services/delete.service";
import { DeleteTicketRepository } from "./repositories/delete.repository";

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
      provide: SERVICE_TOKENS.UnassignTicketService,
      useClass: AssignTicketService,
    },

    {
      provide: SERVICE_TOKENS.ChangeTicketStatusService,
      useClass: ChangeTicketStatusService,
    },
  ],
})
export class TicketModule {}
