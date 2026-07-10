import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IBaseDeleteRepository } from "@/shared/base/repositories/contracts/delete";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import { inject, injectable } from "inversify";

@injectable()
export class BaseDeleteRepository implements IBaseDeleteRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(private basePath: string) {}

  async execute(id: string): Promise<boolean> {
    const response = await this.axiosSingleton.client.delete<boolean>(`${this.basePath}/${id}`);
    return response.data;
  }
}
