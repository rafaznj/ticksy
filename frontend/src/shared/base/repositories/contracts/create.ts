import type { AppError } from "@/shared/errors/app-error";

export interface IBaseCreateRepository<TInput, TOutput> {
  execute(data: TInput): Promise<TOutput | AppError>;
}
