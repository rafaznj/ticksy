import type { AppError } from "@/shared/errors/app-error";

export interface IActivateUserRepository {
  execute(id: string): Promise<boolean | AppError>;
}
