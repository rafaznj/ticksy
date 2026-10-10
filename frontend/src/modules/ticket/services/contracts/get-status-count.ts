import type { TicketStatusCountDTO } from "@/modules/ticket/dtos/status-count";
import type { AppError } from "@/shared/errors/app-error";

export interface IGetTicketStatusCountService {
  execute(): Promise<TicketStatusCountDTO[] | AppError>;
}
