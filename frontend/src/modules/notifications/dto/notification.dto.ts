import type { NotificationTypeEnum } from "@/modules/notifications/enums/notification-type.enum";

export interface NotificationDto {
  id: string;
  type: NotificationTypeEnum;
  ticketId?: string;
  parameters: Record<string, string> | null;
  read: boolean;
  createdAt: string;
}
