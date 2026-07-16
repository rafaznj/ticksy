import type { AppError } from "@/shared/errors/app-error";

export interface IDeactivateUserService {
  execute(id: string): Promise<boolean | AppError>;
}
