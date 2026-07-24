import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import type { CreateTicketDto } from "../../dtos/create.dto";
import type { TicketEntity } from "../../mo/ticket.entity";

export type ICreateTicketService = IBaseCreateService<CreateTicketDto, TicketEntity>;
