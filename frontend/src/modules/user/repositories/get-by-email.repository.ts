import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable } from "inversify";
import type { User } from "../entity/user.entity";
import type { IGetUserByEmailRepository } from "./contracts/get-by-email";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  async execute(email: string): Promise<User | AppError> {
    const response = await this.axiosSingleton.client.get<User>(`/user/get-by-email/${email}`);
    return handleResponse(response);
  }
}
