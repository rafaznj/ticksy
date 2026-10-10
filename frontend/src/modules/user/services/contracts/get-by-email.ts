import type { AppError } from "@/shared/errors/app-error";
import type { UserDto } from "../../dto/user.dto";

export interface IGetUserByEmailService {
  execute(email: string): Promise<UserDto | AppError>;
}
