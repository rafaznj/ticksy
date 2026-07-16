import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { LoginResponse } from "@/modules/auth/dto/login-response";
import type { AppError } from "@/shared/errors/app-error";

export interface ILoginRepository {
  execute(dto: LoginDto): Promise<LoginResponse | AppError>;
}
