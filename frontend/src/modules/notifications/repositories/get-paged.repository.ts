import type { NotificationDto } from "@/modules/notifications/dto/notification.dto";
import type { IGetNotificationPagedRepository } from "@/modules/notifications/repositories/contracts/get-paged";
import { injectable, injectFromBase } from "inversify";
import { BaseGetPagedRepository } from "@/shared/base/repositories/get-paged.repository";

@injectFromBase()
@injectable()
export class GetNotificationPagedRepository
  extends BaseGetPagedRepository<NotificationDto>
  implements IGetNotificationPagedRepository
{
  constructor() {
    super("/notifications");
  }
}
