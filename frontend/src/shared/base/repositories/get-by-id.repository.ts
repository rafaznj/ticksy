import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable } from "inversify";
import type { IBaseGetByIdRepository } from "./contracts/get-by-id";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class BaseGetByIdRepository<TOutput> implements IBaseGetByIdRepository<TOutput> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(protected readonly basePath: string) {}

  async execute(id: string): Promise<TOutput | AppError> {
    const response = await this.axiosSingleton.client.get<TOutput>(`${this.basePath}/${id}`);
    return handleResponse(response);
  }
}
