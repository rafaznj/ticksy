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
import { UserViewModel } from "../../user/view-models/user.vm";
import type { IAssignTicketService } from "../services/contracts/assign";
import type { IQueryOptions } from "../../../shared/interfaces/query-options";
import type { IResolvedTicketService } from "../services/contracts/resolved";
import type { IUnassignTicketService } from "../services/contracts/unassign";
import type { IGetTicketPagedLastSevenDaysService } from "../services/contracts/get-paged-last-seven-days";
import type { IGetTicketStatusCountService } from "../services/contracts/get-status-count";
import { AssignTicketDto } from "../dtos/assign.dto";
import { customResponse } from "../../../shared/utils/custom-response";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRoleEnum } from "../../user/enums/role.enum";
import { RolesGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../auth/decorators/roles.decorator";

@ApiTags("Tickets")
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
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(UserRoleEnum.EMPLOYEE)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a ticket" })
  async create(@Body() data: CreateTicketDto) {
    const response = await this.createTicketService.execute(data);
    return customResponse(response);
  }

  @Get("/get-paged-with-scope")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "List paged tickets within the user's scope" })
  async getPagedWithScope(
    @Query() query: IQueryOptions,
    @Req() req: Request & { user: UserViewModel },
  ) {
    const response = await this.getTicketPagedWithScopeService.execute(query, req.user);
    return customResponse(response);
  }

  @Get("/get-paged-last-seven-days")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "List paged tickets from the last seven days" })
  async getPagedLastSevenDays(
    @Query() query: IQueryOptions,
    @Req() req: Request & { user: UserViewModel },
  ) {
    const response = await this.getTicketPagedLastSevenDaysRepository.execute(query, req.user);
    return customResponse(response);
  }

  @Get("/get-by-id/:id")
  @ApiOperation({ summary: "Get a ticket by ID" })
  async getById(@Param("id") id: string) {
    const response = await this.getTicketByIdService.execute(id);
    return customResponse(response);
  }

  @Put("/update/:id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a ticket" })
  async update(@Param("id") id: string, @Body() data: UpdateTicketDto) {
    const response = await this.updateTicketService.execute(id, data);
    return customResponse(response);
  }

  @Delete("/delete/:id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a ticket" })
  async delete(@Param("id") id: string) {
    const response = await this.deleteTicketService.execute(id);
    return customResponse(response);
  }

  @Patch("/assign/:ticketId")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Assign a ticket to a user" })
  async assign(@Param("ticketId") ticketId: string, @Body() { userId }: AssignTicketDto) {
    const response = await this.assignTicketService.execute(ticketId, userId);
    return customResponse(response);
  }

  @Patch("/unassign/:id")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Unassign a ticket" })
  async unassign(@Param("id") id: string) {
    const response = await this.unassignTicketService.execute(id);
    return customResponse(response);
  }

  @Patch("/resolved/:id")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.TECHNICAL_ASSISTANCE)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Mark a ticket as resolved" })
  async resolved(@Param("id") id: string) {
    const response = await this.resolvedTicketService.execute(id);
    return customResponse(response);
  }

  @Get("/get-status-count")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Count tickets by status" })
  async getStatusCount() {
    const response = await this.getTicketStatusCountService.execute();
    return customResponse(response);
  }
}
