import type { AppError } from "@/shared/errors/app-error";

export interface ILogoutRepository {
  execute(): Promise<void | AppError>;
}
