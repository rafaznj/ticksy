import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { IBaseGetByIdRepository } from "@/shared/base/repositories/contracts/get-by-id";

export interface IGetTicketByIdRepository extends IBaseGetByIdRepository<TicketDto> {}
