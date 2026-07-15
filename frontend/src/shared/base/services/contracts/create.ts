import type { AppError } from "@/shared/errors/app-error";

export interface IBaseCreateService<TInput, TOutput> {
  execute(data: TInput): Promise<TOutput | AppError>;
}
