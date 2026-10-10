import { Inject, Injectable } from "@nestjs/common";
import type { IGetUnreadNotificationCountService } from "./contracts/get-unread-count";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IGetUnreadNotificationCountRepository } from "../repositories/contracts/get-unread-count";
import { UnreadNotificationCountViewModel } from "../view-models/unread-count-model.vm";

@Injectable()
export class GetUnreadNotificationCountService implements IGetUnreadNotificationCountService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetUnreadNotificationCountRepository)
    private readonly getUnreadNotificationsCountRepository: IGetUnreadNotificationCountRepository,
  ) {}

  async execute(userId: string): Promise<UnreadNotificationCountViewModel> {
    const response = await this.getUnreadNotificationsCountRepository.execute(userId);

    return { count: response };
  }
}
