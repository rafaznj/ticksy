import { Inject, Injectable } from "@nestjs/common";
import type { UnreadCountModel } from "../models/unread-count-model";
import type { IGetUnreadNotificationCountService } from "./contracts/get-unread-count";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetUnreadNotificationCountRepository } from "../repositories/contracts/get-unread-count";

@Injectable()
export class GetUnreadNotificationCountService implements IGetUnreadNotificationCountService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUnreadNotificationCountRepository)
    private readonly getUnreadNotificationsCountRepository: IGetUnreadNotificationCountRepository,
  ) {}

  async execute(userId: string): Promise<UnreadCountModel> {
    const response = await this.getUnreadNotificationsCountRepository.execute(userId);

    return { count: response };
  }
}
