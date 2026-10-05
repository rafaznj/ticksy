import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IMarkAllNotificationsAsReadRepository } from "@/modules/notifications/repositories/contracts/mark-all-as-read";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import type { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "inversify";

@injectable()
export class MarkAllNotificationsAsReadRepository implements IMarkAllNotificationsAsReadRepository {
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<boolean | AppError> {
    const response = await this.axiosSingleton.client.patch("notifications/read-all");

    return handleRepositoryResponse(response);
  }
}
