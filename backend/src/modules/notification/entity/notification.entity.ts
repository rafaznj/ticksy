import { NotificationTypeEnum } from "../enums/notification-type.enum";

export interface NotificationEntity {
  id: string;
  type: NotificationTypeEnum;
  ticketId: string | null;
  parameters: Record<string, string> | null;
  createdAt: Date;
}
