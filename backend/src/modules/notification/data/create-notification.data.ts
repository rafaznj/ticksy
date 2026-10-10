import { NotificationTypeEnum } from "../enums/notification-type.enum";

export interface CreateNotificationData {
  type: NotificationTypeEnum;
  ticketId?: string;
  parameters?: Record<string, string>;
  userIds: string[];
}
