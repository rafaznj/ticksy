import { Injectable } from "@nestjs/common";
import { CreateTicketDto } from "../dto/create.dm";
import { UpdateTicketDto } from "../dto/update.dm";

@Injectable()
export class TicketService {
  create(data: CreateTicketDto) {
    return "This action adds a new ticket";
  }

  get() {
    return "Get";
  }

  update(id: number, data: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  delete() {
    return;
  }
}
