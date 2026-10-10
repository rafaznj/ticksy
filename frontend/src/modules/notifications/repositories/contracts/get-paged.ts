import type { NotificationDto } from "@/modules/notifications/dto/notification.dto";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";

export interface IGetNotificationPagedRepository extends IBaseGetPagedRepository<NotificationDto> {}
