import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";

import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { ICreateTicketService } from "../services/contracts/create";
import type { IDeleteTicketService } from "../services/contracts/delete";
import type { IGetTicketByIdService } from "../services/contracts/get-by-id";
import type { IUpdateTicketService } from "../services/contracts/update";
import { CreateTicketDto } from "../dtos/create.dto";
import { UpdateTicketDto } from "../dtos/update.dto";
import type { IGetTicketPagedWithScopeService } from "../services/contracts/get-paged-with-scope";
import { UserModel } from "../../user/models/user-model";
import type { IAssignTicketService } from "../services/contracts/assign";
import type { IQueryOptions } from "../../../shared/types/query-options";
import type { IResolvedTicketService } from "../services/contracts/resolved";
import type { IUnassignTicketService } from "../services/contracts/unassign";
import type { IGetTicketPagedLastSevenDaysService } from "../services/contracts/get-paged-last-seven-days";
import type { IGetTicketStatusCountService } from "../services/contracts/get-status-count";
import { AssignTicketDto } from "../dtos/assign.dto";

@Controller("ticket")
export class TicketController {
  constructor(
    @Inject(SERVICE_TOKENS.CreateTicketService)
    private readonly createTicketService: ICreateTicketService,
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
    @Inject(SERVICE_TOKENS.GetTicketPagedWithScopeService)
    private readonly getTicketPagedWithScopeService: IGetTicketPagedWithScopeService,
    @Inject(SERVICE_TOKENS.GetTicketPagedLastSevenDaysService)
    private readonly getTicketPagedLastSevenDaysRepository: IGetTicketPagedLastSevenDaysService,
    @Inject(SERVICE_TOKENS.UpdateTicketService)
    private readonly updateTicketService: IUpdateTicketService,
    @Inject(SERVICE_TOKENS.DeleteTicketService)
    private readonly deleteTicketService: IDeleteTicketService,
    @Inject(SERVICE_TOKENS.AssignTicketService)
    private readonly assignTicketService: IAssignTicketService,
    @Inject(SERVICE_TOKENS.UnassignTicketService)
    private readonly unassignTicketService: IUnassignTicketService,
    @Inject(SERVICE_TOKENS.ResolvedTicketService)
    private readonly resolvedTicketService: IResolvedTicketService,
    @Inject(SERVICE_TOKENS.GetTicketStatusCountService)
    private readonly getTicketStatusCountService: IGetTicketStatusCountService,
  ) {}

  @Post("/create")
  async create(@Body() data: CreateTicketDto) {
    return this.createTicketService.execute(data);
  }

  @Get("/get-paged-with-scope")
  @UseGuards(AuthGuard("jwt"))
  async getPagedWithScope(
    @Query() query: IQueryOptions,
    @Req() req: Request & { user: Omit<UserModel, "password"> },
  ) {
    const result = await this.getTicketPagedWithScopeService.execute(query, req.user);

    return result;
  }

  @Get("/get-paged-last-seven-days")
  @UseGuards(AuthGuard("jwt"))
  async getPagedLastSevenDays(
    @Query() query: IQueryOptions,
    @Req() req: Request & { user: Omit<UserModel, "password"> },
  ) {
    const result = await this.getTicketPagedLastSevenDaysRepository.execute(query, req.user);

    return result;
  }

  @Get("/get-by-id/:id")
  async getById(@Param("id") id: string) {
    return this.getTicketByIdService.execute(id);
  }

  @Put("/update/:id")
  async update(@Param("id") id: string, @Body() data: UpdateTicketDto) {
    return this.updateTicketService.execute(id, data);
  }

  @Delete("/delete/:id")
  async delete(@Param("id") id: string) {
    return this.deleteTicketService.execute(id);
  }

  @Patch("/assign/:ticketId")
  async assign(@Param("ticketId") ticketId: string, @Body() { userId }: AssignTicketDto) {
    return this.assignTicketService.execute(ticketId, userId);
  }

  @Patch("/unassign/:id")
  async unassign(@Param("id") id: string) {
    return this.unassignTicketService.execute(id);
  }

  @Patch("/resolved/:id")
  async resolved(@Param("id") id: string) {
    return this.resolvedTicketService.execute(id);
  }

  @Get("/get-status-count")
  async getStatusCount() {
    return this.getTicketStatusCountService.execute();
  }
}
