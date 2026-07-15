import { inject, injectable } from "inversify";
import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IBaseCreateRepository } from "./contracts/create";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class BaseCreateRepository<TInput, TOutput> implements IBaseCreateRepository<
  TInput,
  TOutput
> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(private basePath: string) {}

  async execute(data: TInput): Promise<TOutput | AppError> {
    const response = await this.axiosSingleton.client.post<TOutput>(`${this.basePath}/`, data);
    return handleResponse(response);
  }
}
