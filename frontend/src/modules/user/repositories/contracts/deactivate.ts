import type { AppError } from "@/shared/errors/app-error";

export interface IDeactivateUserRepository {
  execute(id: string): Promise<boolean | AppError>;
}
