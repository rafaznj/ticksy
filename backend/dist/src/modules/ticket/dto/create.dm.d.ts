import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
export declare class CreateTicketDto {
    title: string;
    description: string;
    priority: TicketPriorityEnum;
}
