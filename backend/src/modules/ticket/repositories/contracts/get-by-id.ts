import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { TicketModel } from "../../models/ticket";

export type IGetTicketByIdRepository = IBaseGetByIdRepository<TicketModel>;
