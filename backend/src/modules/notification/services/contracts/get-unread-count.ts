import { UnreadNotificationCountViewModel } from "../../view-models/unread-count-model.vm";

export interface IGetUnreadNotificationCountService {
  execute(userId: string): Promise<UnreadNotificationCountViewModel>;
}
