import type { ForgotPasswordData } from "@/modules/user/data/forgot-password";
import type { AppError } from "@/shared/errors/app-error";

export interface IForgotPasswordUserService {
  execute(data: ForgotPasswordData): Promise<void | AppError>;
}
