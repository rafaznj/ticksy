import type { StatusCountDTO } from "@/modules/ticket/dtos/status-count";
import type { AppError } from "@/shared/errors/app-error";

export interface IGetTicketStatusCountRepository {
  execute(): Promise<StatusCountDTO[] | AppError>;
}
