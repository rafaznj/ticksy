import type { AppError } from "@/shared/errors/app-error";

export interface IMarkAllNotificationsAsReadRepository {
  execute(): Promise<boolean | AppError>;
}
