import { TicketStatusCountViewModel } from "../../view-models/status-count.vm";

export interface IGetTicketStatusCountRepository {
  execute(): Promise<TicketStatusCountViewModel[]>;
}
