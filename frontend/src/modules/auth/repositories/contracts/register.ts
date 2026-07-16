import type { AppError } from "@/shared/errors/app-error";
import type { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import type { RegisterResponse } from "@/modules/auth/dto/register-response";

export interface IRegisterRepository {
  execute(dto: CreateUserDto): Promise<RegisterResponse | AppError>;
}
