import type { NotificationCountDto } from "@/modules/notifications/dto/count.dto";
import type { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "inversify";
import type { IGetUnreadNotificationCountService } from "@/modules/notifications/services/contracts/get-unread-count";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IGetUnreadNotificationCountRepository } from "@/modules/notifications/repositories/contracts/get-unread-count";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";

@injectable()
export class GetUnreadNotificationCountService implements IGetUnreadNotificationCountService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetUnreadNotificationCountRepository)
    private readonly getUnreadNotificationCountRepository: IGetUnreadNotificationCountRepository,
  ) {}

  async execute(): Promise<NotificationCountDto | AppError> {
    const response = await this.getUnreadNotificationCountRepository.execute();

    return handleServiceResponse(response);
  }
}
