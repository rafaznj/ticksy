import type { NotificationCountDto } from "@/modules/notifications/dto/count.dto";
import type { AppError } from "@/shared/errors/app-error";

export interface IGetUnreadNotificationCountService {
  execute: () => Promise<NotificationCountDto | AppError>;
}
