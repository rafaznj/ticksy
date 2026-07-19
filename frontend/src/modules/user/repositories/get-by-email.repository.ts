import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable } from "inversify";
import type { UserEntity } from "../entity/user.entity";
import type { IGetUserByEmailRepository } from "./contracts/get-by-email";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  async execute(email: string): Promise<UserEntity | AppError> {
    const response = await this.axiosSingleton.client.get<UserEntity>(
      `/user/get-by-email/${email}`,
    );
    return handleResponse(response);
  }
}
