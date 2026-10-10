import { CreateNotificationData } from "../../data/create-notification.data";
import type { NotificationViewModel } from "../../view-models/notification.vm";

export interface ICreateNotificationRepository {
  execute(data: CreateNotificationData): Promise<NotificationViewModel>;
}
