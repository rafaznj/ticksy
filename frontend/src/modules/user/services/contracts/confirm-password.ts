import type { AppError } from "@/shared/errors/app-error";

export interface IConfirmPasswordService {
  execute(password: string): Promise<void | AppError>;
}
