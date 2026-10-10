import type { RegisterDto } from "@/modules/auth/dto/register.dto";
import type { CreateUserData } from "@/modules/user/data/create.data";
import type { AppError } from "@/shared/errors/app-error";

export interface IRegisterService {
  execute(data: CreateUserData): Promise<RegisterDto | AppError>;
}
