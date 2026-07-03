import { CreateTicketDto } from "./create.dm";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
declare const UpdateTicketDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTicketDto>>;
export declare class UpdateTicketDto extends UpdateTicketDto_base {
    status?: TicketStatusEnum;
    assignedToId?: string | null;
}
export {};
