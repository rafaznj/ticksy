import type { ForgotPasswordData } from "@/modules/user/data/forgot-password";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IForgotPasswordUserRepository {
  execute(data: ForgotPasswordData): Promise<APIResponse<void> | AppError>;
}
