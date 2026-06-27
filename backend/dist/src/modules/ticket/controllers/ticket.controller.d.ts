import { CreateTicketDto } from "../dto/create.dm";
import { TicketService } from "../services/ticket.service";
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    create(data: CreateTicketDto): string;
}
