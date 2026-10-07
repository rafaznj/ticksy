import type { INotification } from "@/modules/notifications/entity/notification.entity";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";

export interface IGetNotificationPagedRepository extends IBaseGetPagedRepository<INotification> {}
