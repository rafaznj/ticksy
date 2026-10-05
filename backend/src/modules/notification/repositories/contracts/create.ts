import { CreateNotificationData } from "../../data/create-notification.data";
import type { NotificationEntity } from "../../entity/notification.entity";

export interface ICreateNotificationRepository {
  execute(data: CreateNotificationData): Promise<NotificationEntity>;
}
