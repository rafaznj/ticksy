import type { AppError } from "@/shared/errors/app-error";

export interface IRefreshService {
  execute(): Promise<void | AppError>;
}
