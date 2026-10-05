import type { INotification } from "@/modules/notifications/entity/notification.entity";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetNotificationPagedService extends IBaseGetPagedService<INotification> {}
