import { NotificationTypeEnum } from "../enums/notification-type.enum";

export interface NotificationViewModel {
  id: string;
  type: NotificationTypeEnum;
  ticketId: string | null;
  parameters: Record<string, string> | null;
  read?: boolean;
  createdAt: Date;
}
