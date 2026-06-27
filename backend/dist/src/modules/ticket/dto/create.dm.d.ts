import { TicketPriority } from "../enums/ticket.enum";
export declare class CreateTicketDto {
    title: string;
    description: string;
    priority: TicketPriority;
}
