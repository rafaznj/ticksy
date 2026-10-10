import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable } from "inversify";
import type { UserDto } from "../dto/user.dto";
import type { IGetUserByEmailRepository } from "./contracts/get-by-email";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  private readonly basePath = "user";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(email: string): Promise<APIResponse<UserDto> | AppError> {
    const response = await this.axiosSingleton.client.get<APIResponse<UserDto>>(
      `${this.basePath}/get-by-email/${email}`,
    );

    return handleRepositoryResponse(response);
  }
}
