import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IMarkAllNotificationsAsReadRepository } from "../repositories/contracts/mark-all-as-read";
import type { IMarkAllNotificationsAsReadService } from "./contracts/mark-all-as-read";

@Injectable()
export class MarkAllNotificationsAsReadService implements IMarkAllNotificationsAsReadService {
  constructor(
    @Inject(REPOSITORY_TOKENS.MarkAllNotificationsAsReadRepository)
    private readonly markAllNotificationsAsReadRepository: IMarkAllNotificationsAsReadRepository,
  ) {}

  execute(userId: string): Promise<boolean> {
    return this.markAllNotificationsAsReadRepository.execute(userId);
  }
}
