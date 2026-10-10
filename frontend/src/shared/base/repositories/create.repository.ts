import { inject, injectable, unmanaged } from "inversify";
import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IBaseCreateRepository } from "./contracts/create";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "../../interfaces/api-response";

@injectable()
export class BaseCreateRepository<TInput, TOutput> implements IBaseCreateRepository<
  TInput,
  TOutput
> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(@unmanaged() private basePath: string) {}

  async execute(data: TInput): Promise<APIResponse<TOutput> | AppError> {
    const response = await this.axiosSingleton.client.post<APIResponse<TOutput> | AppError>(
      `${this.basePath}/create`,
      data,
    );

    return handleRepositoryResponse(response);
  }
}
