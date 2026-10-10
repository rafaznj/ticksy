import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateTicketData } from "@/modules/ticket/data/update.data";

export interface IUpdateTicketService extends IBaseUpdateService<UpdateTicketData> {}
