import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import type { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { NotificationViewModel } from "../../view-models/notification.vm";

export interface IGetNotificationPagedService {
  execute(userId: string, options: IQueryOptions): Promise<IPagedResult<NotificationViewModel>>;
}
