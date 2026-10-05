import type { NotificationEntity } from "../entity/notification.entity";

export interface NotificationModel extends NotificationEntity {
  read: boolean;
}
