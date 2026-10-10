import type { UpdateTicketData } from "@/modules/ticket/data/update.data";
import type { IBaseUpdateRepository } from "@/shared/base/repositories/contracts/update";

export interface IUpdateTicketRepository extends IBaseUpdateRepository<UpdateTicketData> {}
