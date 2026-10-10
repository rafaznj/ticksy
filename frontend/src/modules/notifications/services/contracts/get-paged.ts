import type { NotificationDto } from "@/modules/notifications/dto/notification.dto";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

export interface IGetNotificationPagedService extends IBaseGetPagedService<NotificationDto> {}
