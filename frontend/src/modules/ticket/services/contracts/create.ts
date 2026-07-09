import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import type { CreateTicketDto } from "../../dto/create.dto";
import type { Ticket } from "../../entity/ticket.entity";

export type ICreateTicketService = IBaseCreateService<CreateTicketDto, Ticket>;
