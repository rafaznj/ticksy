import { inject, injectable } from "inversify";
import type { IDeactivateUserRepository } from "./contracts/deactivate";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";

@injectable()
export class DeactivateUserRepository implements IDeactivateUserRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  async execute(id: string): Promise<boolean> {
    const response = await this.axiosSingleton.client.patch<boolean>(`/user/${id}`);
    return response.data;
  }
}
