import type { AppError } from "@/shared/errors/app-error";
import type { UserDto } from "../../dto/user.dto";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<APIResponse<UserDto> | AppError>;
}
