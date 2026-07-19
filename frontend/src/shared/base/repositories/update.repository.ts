import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable, unmanaged } from "inversify";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { IBaseUpdateRepository } from "@/shared/base/repositories/contracts/update";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class BaseUpdateRepository<T> implements IBaseUpdateRepository<T> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;
  constructor(@unmanaged() private basePath: string) {}

  async execute(id: string, data: T): Promise<T | AppError> {
    const response = await this.axiosSingleton.client.put<T>(`${this.basePath}/${id}`, data);
    return handleResponse(response);
  }
}
