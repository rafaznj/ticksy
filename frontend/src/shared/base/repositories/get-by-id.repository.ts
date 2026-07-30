import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable, unmanaged } from "inversify";
import type { IBaseGetByIdRepository } from "./contracts/get-by-id";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponseRepository } from "@/shared/errors/handle-response-repository";

@injectable()
export class BaseGetByIdRepository<TOutput> implements IBaseGetByIdRepository<TOutput> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(@unmanaged() private basePath: string) {}

  async execute(id: string): Promise<TOutput | AppError> {
    const response = await this.axiosSingleton.client.get<TOutput>(`${this.basePath}/${id}`);
    return handleResponseRepository(response);
  }
}
