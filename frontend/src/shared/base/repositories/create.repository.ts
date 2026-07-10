import { inject, injectable } from "inversify";
import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IBaseCreateRepository } from "./contracts/create";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";

@injectable()
export class BaseCreateRepository<TInput, TOutput> implements IBaseCreateRepository<
  TInput,
  TOutput
> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(private basePath: string) {}

  async execute(data: TInput): Promise<TOutput> {
    const response = await this.axiosSingleton.client.post<TOutput>(`${this.basePath}/`, data);
    return response.data;
  }
}
