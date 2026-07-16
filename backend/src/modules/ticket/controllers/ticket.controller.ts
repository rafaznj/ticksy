import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { ICreateTicketService } from "../services/contracts/create";
import type { IDeleteTicketService } from "../services/contracts/delete";
import type { IGetTicketByIdService } from "../services/contracts/get-by-id";
import type { IUpdateTicketService } from "../services/contracts/update";
import { CreateTicketDto } from "../dto/create.dto";
import { UpdateTicketDto } from "../dto/update.dto";

@Controller("ticket")
export class TicketController {
  constructor(
    @Inject(SERVICE_TOKENS.CreateTicketService)
    private readonly createTicketService: ICreateTicketService,
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
    @Inject(SERVICE_TOKENS.UpdateTicketService)
    private readonly updateTicketService: IUpdateTicketService,
    @Inject(SERVICE_TOKENS.DeleteTicketService)
    private readonly deleteTicketService: IDeleteTicketService,
  ) {}

  @Post("")
  async create(@Body() data: CreateTicketDto) {
    return this.createTicketService.execute(data);
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
}
