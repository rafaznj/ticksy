import type { AppError } from "@/shared/errors/app-error";
import type { RegisterDto } from "@/modules/auth/dto/register.dto";
import type { CreateUserData } from "@/modules/user/data/create.data";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IRegisterRepository {
  execute(dto: CreateUserData): Promise<APIResponse<RegisterDto> | AppError>;
}
