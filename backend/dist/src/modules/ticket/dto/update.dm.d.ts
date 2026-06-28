import { TicketStatusEnum } from "../enums/ticket.enum";
import { CreateTicketDto } from "./create.dm";
declare const UpdateTicketDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTicketDto>>;
export declare class UpdateTicketDto extends UpdateTicketDto_base {
    status?: TicketStatusEnum;
    assignedToId?: string | null;
}
export {};
