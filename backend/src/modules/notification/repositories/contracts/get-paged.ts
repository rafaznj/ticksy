import type { IPagedResult } from "../../../../shared/types/paged-result";
import type { IQueryOptions } from "../../../../shared/types/query-options";
import type { NotificationModel } from "../../models/notification-model";

export interface IGetNotificationPagedRepository {
  execute(userId: string, options: IQueryOptions): Promise<IPagedResult<NotificationModel>>;
}
