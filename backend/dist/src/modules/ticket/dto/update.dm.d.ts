import { CreateTicketDto } from "./create.dm";
import { TicketStatus } from "../enums/ticket.enum";
declare const UpdateTicketDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTicketDto>>;
export declare class UpdateTicketDto extends UpdateTicketDto_base {
    status?: TicketStatus;
    assignedToId?: string | null;
}
export {};
