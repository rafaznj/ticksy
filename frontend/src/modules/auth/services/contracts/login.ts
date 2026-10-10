import type { LoginData } from "@/modules/auth/data/login.data";
import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { AppError } from "@/shared/errors/app-error";

export interface ILoginService {
  execute(data: LoginData): Promise<LoginDto | AppError>;
}
