import { inject, injectable } from "inversify";
import type { AppError } from "@/shared/errors/app-error";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { IMarkNotificationAsReadService } from "@/modules/notifications/services/contracts/mark-as-read";
import type { IMarkNotificationAsReadRepository } from "@/modules/notifications/repositories/contracts/mark-as-read";

@injectable()
export class MarkNotificationAsReadService implements IMarkNotificationAsReadService {
  constructor(
    @inject(REPOSITORY_TOKENS.MarkNotificationAsReadRepository)
    private readonly markNotificationAsReadRepository: IMarkNotificationAsReadRepository,
  ) {}

  async execute(notificationId: string): Promise<boolean | AppError> {
    const response = await this.markNotificationAsReadRepository.execute(notificationId);

    return handleServiceResponse(response);
  }
}
