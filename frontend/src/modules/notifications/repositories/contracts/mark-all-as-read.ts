import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IMarkAllNotificationsAsReadRepository {
  execute(): Promise<APIResponse<boolean> | AppError>;
}
