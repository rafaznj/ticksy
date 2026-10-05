import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IGetUnreadNotificationCountRepository } from "@/modules/notifications/repositories/contracts/get-unread-count";
import type { INotificationCount } from "@/modules/notifications/entity/notification-count";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import { inject, injectable } from "inversify";

@injectable()
export class GetUnreadNotificationCountRepository implements IGetUnreadNotificationCountRepository {
  private readonly basePath = "notifications";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<INotificationCount | AppError> {
    const response = await this.axiosSingleton.client.get<INotificationCount>(
      `${this.basePath}/unread-count`,
    );

    return handleRepositoryResponse(response);
  }
}
