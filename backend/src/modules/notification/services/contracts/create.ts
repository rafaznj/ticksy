import { CreateNotificationData } from "../../data/create-notification.data";
import type { NotificationEntity } from "../../entity/notification.entity";

export interface ICreateNotificationService {
  execute(data: CreateNotificationData): Promise<NotificationEntity | null>;
}
