import type { LoginResponse } from "@/modules/auth/dto/login-response";
import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { AppError } from "@/shared/errors/app-error";

export interface ILoginService {
  execute(data: LoginDto): Promise<LoginResponse | AppError>;
}
