import { StatusCountModel } from "../../models/status-count";

export interface IGetTicketStatusCountRepository {
  execute(): Promise<StatusCountModel[]>;
}
