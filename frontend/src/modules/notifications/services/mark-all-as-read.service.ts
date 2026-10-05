import type { AppError } from "@/shared/errors/app-error";
import type { IMarkAllNotificationsAsReadRepository } from "@/modules/notifications/repositories/contracts/mark-all-as-read";
import type { IMarkAllNotificationsAsReadService } from "@/modules/notifications/services/contracts/mark-all-as-read";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import { inject, injectable } from "inversify";

@injectable()
export class MarkAllNotificationsAsReadService implements IMarkAllNotificationsAsReadService {
  constructor(
    @inject(REPOSITORY_TOKENS.MarkAllNotificationsAsReadRepository)
    private readonly markAllNotificationsAsReadRepository: IMarkAllNotificationsAsReadRepository,
  ) {}

  async execute(): Promise<boolean | AppError> {
    const response = await this.markAllNotificationsAsReadRepository.execute();

    return handleServiceResponse(response);
  }
}
