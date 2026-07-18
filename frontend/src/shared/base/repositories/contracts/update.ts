import type { AppError } from "@/shared/errors/app-error";

export interface IBaseUpdateRepository<T> {
  execute(id: string, data: T): Promise<T | AppError>;
}
