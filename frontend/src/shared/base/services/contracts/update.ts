import type { AppError } from "@/shared/errors/app-error";

export interface IBaseUpdateService<TInput, TOutput> {
  execute(id: string, data: TInput): Promise<TOutput | AppError>;
}
