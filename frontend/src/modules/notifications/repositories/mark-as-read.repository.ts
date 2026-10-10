import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IMarkNotificationAsReadRepository } from "@/modules/notifications/repositories/contracts/mark-as-read";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import { inject, injectable } from "inversify";
import { handleRepositoryResponse } from "../../../shared/interfaces/handle-repository-response";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class MarkNotificationAsReadRepository implements IMarkNotificationAsReadRepository {
  private readonly basePath = "notifications";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(notificationId: string): Promise<APIResponse<boolean> | AppError> {
    const response = await this.axiosSingleton.client.patch<APIResponse<boolean> | AppError>(
      `${this.basePath}/${notificationId}/read`,
    );

    return handleRepositoryResponse(response);
  }
}
