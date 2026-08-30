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
import { AssignTicketDto } from "../dtos/assign.dto";
import type { IQueryOptions } from "../../../shared/types/query-options";
import type { IResolvedTicketService } from "../services/contracts/resolved";
import type { IUnassignTicketService } from "../services/contracts/unassign";
import { UnassignTicketDto } from "../dtos/unassign.dto";
import type { IGetTicketPagedCurrentMonthService } from "../services/contracts/get-paged-tickets-current-month";

@Controller("ticket")
export class TicketController {
  constructor(
    @Inject(SERVICE_TOKENS.CreateTicketService)
    private readonly createTicketService: ICreateTicketService,
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
    @Inject(SERVICE_TOKENS.GetTicketPagedWithScopeService)
    private readonly getTicketPagedWithScopeService: IGetTicketPagedWithScopeService,
    @Inject(SERVICE_TOKENS.GetTicketPagedCurrentMonthService)
    private readonly getTicketPagedCurrentMonthRepository: IGetTicketPagedCurrentMonthService,
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
  ) {}

  @Post("")
  async create(@Body() data: CreateTicketDto) {
    return this.createTicketService.execute(data);
  }

  @Get("get-paged-with-scope")
  @UseGuards(AuthGuard("jwt"))
  async getPaged(
    @Query() query: IQueryOptions,
    @Req() req: Request & { user: Omit<UserModel, "password"> },
  ) {
    const result = await this.getTicketPagedWithScopeService.execute(query, req.user);

    return result;
  }

  @Get("get-paged-current-month")
  async getPagedCurrentMonth(@Query() query: IQueryOptions) {
    const result = await this.getTicketPagedCurrentMonthRepository.execute(query);
    return result;
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.getTicketByIdService.execute(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: UpdateTicketDto) {
    return this.updateTicketService.execute(id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.deleteTicketService.execute(id);
  }

  @Patch("/assign")
  async assign(@Body() { id, userId }: AssignTicketDto) {
    return this.assignTicketService.execute(id, userId);
  }

  @Patch("/unassign")
  async unassign(@Body() { id }: UnassignTicketDto) {
    return this.unassignTicketService.execute(id);
  }

  @Patch("/resolved/:id")
  async resolved(@Param("id") id: string) {
    return this.resolvedTicketService.execute(id);
  }
}
