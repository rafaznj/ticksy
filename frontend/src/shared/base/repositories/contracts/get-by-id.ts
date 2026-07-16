import type { AppError } from "@/shared/errors/app-error";

export interface IBaseGetByIdRepository<TOutput> {
  execute(id: string): Promise<TOutput | AppError>;
}
