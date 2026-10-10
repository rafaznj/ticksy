import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IMarkAllNotificationsAsReadRepository } from "@/modules/notifications/repositories/contracts/mark-all-as-read";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "inversify";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class MarkAllNotificationsAsReadRepository implements IMarkAllNotificationsAsReadRepository {
  private readonly basePath = "notifications";
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<APIResponse<boolean> | AppError> {
    const response = await this.axiosSingleton.client.patch<APIResponse<boolean> | AppError>(
      `${this.basePath}/read-all`,
    );

    return handleRepositoryResponse(response);
  }
}
