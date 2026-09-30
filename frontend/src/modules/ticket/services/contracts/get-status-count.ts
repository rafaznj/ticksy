import type { StatusCountDTO } from "@/modules/ticket/dtos/status-count";
import type { AppError } from "@/shared/errors/app-error";

export interface IGetTicketStatusCountService {
  execute(): Promise<StatusCountDTO[] | AppError>;
}
