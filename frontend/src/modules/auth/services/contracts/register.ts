import type { RegisterResponse } from "@/modules/auth/dto/register-response";
import type { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import type { AppError } from "@/shared/errors/app-error";

export interface IRegisterService {
  execute(data: CreateUserDto): Promise<RegisterResponse | AppError>;
}
