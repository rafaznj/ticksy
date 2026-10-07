import type { INotification } from "@/modules/notifications/entity/notification.entity";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

export interface IGetNotificationPagedService extends IBaseGetPagedService<INotification> {}
