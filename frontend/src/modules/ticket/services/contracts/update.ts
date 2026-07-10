import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateTicketDto } from "../../dto/update.dto";
import type { Ticket } from "../../entity/ticket.entity";

export type IUpdateTicketService = IBaseUpdateService<UpdateTicketDto, Ticket>;
