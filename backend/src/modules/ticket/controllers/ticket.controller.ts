import { Controller, Post, Body } from "@nestjs/common";
import { CreateTicketDto } from "../dto/create.dm";
import { TicketService } from "../services/ticket.service";

@Controller("ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() data: CreateTicketDto) {
    return this.ticketService.create(data);
  }

  // @Get()
  // findAll() {
  //   return this.ticketService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.ticketService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
  //   return this.ticketService.update(+id, updateTicketDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.ticketService.remove(+id);
  // }
}
