import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateTicketDto } from "../../dtos/update.dto";

export type IUpdateTicketService = IBaseUpdateService<UpdateTicketDto>;
