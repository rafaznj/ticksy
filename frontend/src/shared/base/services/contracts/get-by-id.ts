import type { AppError } from "@/shared/errors/app-error";

export interface IBaseGetByIdService<TOutput> {
  execute(id: string): Promise<TOutput | AppError>;
}
