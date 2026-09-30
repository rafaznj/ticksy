import { StatusCountModel } from "../../models/status-count";

export interface IGetTicketStatusCountService {
  execute(): Promise<StatusCountModel[]>;
}
