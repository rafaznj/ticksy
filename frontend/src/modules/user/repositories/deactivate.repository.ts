import { inject, injectable } from "inversify";
import type { IDeactivateUserRepository } from "./contracts/deactivate";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class DeactivateUserRepository implements IDeactivateUserRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  async execute(id: string): Promise<boolean | AppError> {
    const response = await this.axiosSingleton.client.patch<boolean>(`/user/${id}`);
    return handleResponse(response);
  }
}
