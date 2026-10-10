import type { NotificationCountDto } from "@/modules/notifications/dto/count.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IGetUnreadNotificationCountRepository {
  execute: () => Promise<APIResponse<NotificationCountDto> | AppError>;
}
