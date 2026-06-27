import { CreateTicketDto } from "./dto/create.dm";
import { UpdateTicketDto } from "./dto/update.dm";
export declare class TicketService {
    create(data: CreateTicketDto): string;
    get(): string;
    update(id: number, data: UpdateTicketDto): string;
    delete(): void;
}
