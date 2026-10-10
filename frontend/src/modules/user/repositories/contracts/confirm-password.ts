import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IConfirmPasswordRepository {
  execute(password: string): Promise<APIResponse<void> | AppError>;
}
