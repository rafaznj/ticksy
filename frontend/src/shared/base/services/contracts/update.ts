import type { AppError } from "@/shared/errors/app-error";

export interface IBaseUpdateService<T> {
  execute(id: string, data: T): Promise<T | AppError>;
}
