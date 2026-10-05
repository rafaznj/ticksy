import type { INotification } from "@/modules/notifications/entity/notification.entity";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetNotificationPagedRepository extends IBaseGetPagedRepository<INotification> {}
