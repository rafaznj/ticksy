import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create.dm";
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    create(data: CreateTicketDto): string;
}
