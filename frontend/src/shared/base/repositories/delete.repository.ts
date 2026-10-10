import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IBaseDeleteRepository } from "@/shared/base/repositories/contracts/delete";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import { inject, injectable, unmanaged } from "inversify";

@injectable()
export class BaseDeleteRepository implements IBaseDeleteRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(@unmanaged() private basePath: string) {}

  async execute(id: string): Promise<APIResponse<boolean> | AppError> {
    const response = await this.axiosSingleton.client.delete<APIResponse<boolean> | AppError>(
      `${this.basePath}/delete/${id}`,
    );

    return handleRepositoryResponse(response);
  }
}
