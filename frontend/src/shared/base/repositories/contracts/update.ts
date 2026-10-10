import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IBaseUpdateRepository<T> {
  execute(id: string, data: T): Promise<APIResponse<T> | AppError>;
}
