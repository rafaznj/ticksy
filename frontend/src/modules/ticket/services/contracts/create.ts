import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import type { CreateTicketDto } from "../../dtos/create.dto";
import type { TicketEntity } from "../../entity/ticket.entity";

export type ICreateTicketService = IBaseCreateService<CreateTicketDto, TicketEntity>;
