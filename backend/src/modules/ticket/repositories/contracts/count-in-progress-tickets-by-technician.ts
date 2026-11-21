import { ICountInProgressTickets } from "../../view-models/count-in-progress.vm";

export interface ICountInprogressTicketsByTechnicianRepository {
  execute(technicianIds: string[]): Promise<ICountInProgressTickets[]>;
}
