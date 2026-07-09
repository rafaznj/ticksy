import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable } from "inversify";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { IBaseUpdateRepository } from "@/shared/base/repositories/contracts/update";

@injectable()
export class BaseUpdateRepository<TInput, TOutput> implements IBaseUpdateRepository<
  TInput,
  TOutput
> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;
  constructor(protected readonly basePath: string) {}

  async execute(id: string, data: TInput): Promise<TOutput | null> {
    const response = await this.axiosSingleton.client.put<TOutput>(`${this.basePath}/${id}`, data);
    return response.data;
  }
}
