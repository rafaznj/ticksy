import { CreateNotificationData } from "../../data/create-notification.data";
import type { NotificationViewModel } from "../../view-models/notification.vm";

export interface ICreateNotificationService {
  execute(data: CreateNotificationData): Promise<NotificationViewModel | null>;
}
