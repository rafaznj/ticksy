import { TicketStatusCountViewModel } from "../../view-models/status-count.vm";

export interface IGetTicketStatusCountService {
  execute(): Promise<TicketStatusCountViewModel[]>;
}
