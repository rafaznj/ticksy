import type { INotificationCount } from "@/modules/notifications/entity/notification-count";
import type { AppError } from "@/shared/errors/app-error";

export interface IGetUnreadNotificationCountRepository {
  execute: () => Promise<INotificationCount | AppError>;
}
