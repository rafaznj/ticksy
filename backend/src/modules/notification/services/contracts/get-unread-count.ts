import type { UnreadCountModel } from "../../models/unread-count-model";

export interface IGetUnreadNotificationCountService {
  execute(userId: string): Promise<UnreadCountModel>;
}
