import { Inject, Injectable } from "@nestjs/common";
import type { IPagedResult } from "../../../shared/types/paged-result";
import type { IQueryOptions } from "../../../shared/types/query-options";
import type { NotificationModel } from "../models/notification-model";
import type { IGetNotificationPagedService } from "./contracts/get-paged";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetNotificationPagedRepository } from "../repositories/contracts/get-paged";

@Injectable()
export class GetNotificationPagedService implements IGetNotificationPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetNotificationPagedRepository)
    private readonly getNotificationsPagedRepository: IGetNotificationPagedRepository,
  ) {}

  async execute(userId: string, options: IQueryOptions): Promise<IPagedResult<NotificationModel>> {
    const response = await this.getNotificationsPagedRepository.execute(userId, options);

    return response;
  }
}
