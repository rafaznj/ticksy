import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IGetUnreadNotificationCountRepository } from "@/modules/notifications/repositories/contracts/get-unread-count";
import type { NotificationCountDto } from "@/modules/notifications/dto/count.dto";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import { inject, injectable } from "inversify";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class GetUnreadNotificationCountRepository implements IGetUnreadNotificationCountRepository {
  private readonly basePath = "notifications";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<APIResponse<NotificationCountDto> | AppError> {
    const response = await this.axiosSingleton.client.get<
      APIResponse<NotificationCountDto> | AppError
    >(`${this.basePath}/unread-count`);

    return handleRepositoryResponse(response);
  }
}
