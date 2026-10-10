import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IMarkNotificationAsReadService } from "./contracts/mark-as-read";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IMarkNotificationAsReadRepository } from "../repositories/contracts/mark-as-read";

@Injectable()
export class MarkNotificationAsReadService implements IMarkNotificationAsReadService {
  constructor(
    @Inject(REPOSITORY_TOKENS.MarkNotificationAsReadRepository)
    private readonly markNotificationAsReadRepository: IMarkNotificationAsReadRepository,
  ) {}

  async execute(notificationId: string, userId: string): Promise<boolean> {
    const response = await this.markNotificationAsReadRepository.execute(notificationId, userId);

    if (!response) {
      throw new NotFoundException("notification.messages.errors.notFound");
    }

    return true;
  }
}
