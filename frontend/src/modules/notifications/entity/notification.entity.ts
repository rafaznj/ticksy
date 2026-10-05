import type { NotificationTypeEnum } from "@/modules/notifications/enums/notification-type.enum";

export interface INotification {
  id: string;
  type: NotificationTypeEnum;
  ticketId?: string;
  parameters: Record<string, string> | null;
  read: boolean;
  createdAt: string;
}
