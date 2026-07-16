import type { AppError } from "@/shared/errors/app-error";

export interface ILogoutService {
  execute(): Promise<void | AppError>;
}
