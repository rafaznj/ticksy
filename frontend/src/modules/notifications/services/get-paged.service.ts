import type { INotification } from "@/modules/notifications/entity/notification.entity";
import type { IGetNotificationPagedRepository } from "@/modules/notifications/repositories/contracts/get-paged";
import type { IGetNotificationPagedService } from "@/modules/notifications/services/contracts/get-paged";
import { BaseGetPagedService } from "@/shared/base/services/get-paged.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";

@injectable()
export class GetNotificationPagedService
  extends BaseGetPagedService<INotification>
  implements IGetNotificationPagedService
{
  constructor(
    @inject(REPOSITORY_TOKENS.GetNotificationPagedRepository)
    getNotificationPagedRepository: IGetNotificationPagedRepository,
  ) {
    super(getNotificationPagedRepository);
  }
}
