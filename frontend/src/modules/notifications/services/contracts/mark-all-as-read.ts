import type { AppError } from "@/shared/errors/app-error";

export interface IMarkAllNotificationsAsReadService {
  execute(): Promise<boolean | AppError>;
}
