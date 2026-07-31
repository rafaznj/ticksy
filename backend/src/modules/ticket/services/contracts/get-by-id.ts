import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { TicketModel } from "../../models/ticket";

export type IGetTicketByIdService = IBaseGetByIdService<TicketModel>;
