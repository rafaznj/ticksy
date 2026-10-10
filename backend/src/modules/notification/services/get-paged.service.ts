import { Inject, Injectable } from "@nestjs/common";
import type { IQueryOptions } from "../../../shared/interfaces/query-options";
import type { IGetNotificationPagedService } from "./contracts/get-paged";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetNotificationPagedRepository } from "../repositories/contracts/get-paged";
import { IPagedResult } from "../../../shared/interfaces/paged-result";
import { NotificationViewModel } from "../view-models/notification.vm";

@Injectable()
export class GetNotificationPagedService implements IGetNotificationPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetNotificationPagedRepository)
    private readonly getNotificationsPagedRepository: IGetNotificationPagedRepository,
  ) {}

  async execute(
    userId: string,
    options: IQueryOptions,
  ): Promise<IPagedResult<NotificationViewModel>> {
    const response = await this.getNotificationsPagedRepository.execute(userId, options);

    return response;
  }
}
