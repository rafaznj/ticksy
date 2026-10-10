import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IBaseCreateRepository<TInput, TOutput> {
  execute(data: TInput): Promise<APIResponse<TOutput> | AppError>;
}
