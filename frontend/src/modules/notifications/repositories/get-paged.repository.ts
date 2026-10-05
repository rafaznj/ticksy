import type { INotification } from "@/modules/notifications/entity/notification.entity";
import type { IGetNotificationPagedRepository } from "@/modules/notifications/repositories/contracts/get-paged";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import { inject, injectable } from "inversify";

@injectable()
export class GetNotificationPagedRepository implements IGetNotificationPagedRepository {
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<INotification> | AppError> {
    const response = await this.axiosSingleton.client.get<PagedResponse<INotification>>(
      "/notifications",
      { params },
    );

    return handleRepositoryResponse(response);
  }
}
