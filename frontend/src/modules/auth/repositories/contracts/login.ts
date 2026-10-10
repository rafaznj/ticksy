import type { LoginData } from "@/modules/auth/data/login.data";
import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface ILoginRepository {
  execute(dto: LoginData): Promise<APIResponse<LoginDto> | AppError>;
}
