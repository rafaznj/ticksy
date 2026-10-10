import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IBaseDeleteRepository {
  execute(id: string): Promise<APIResponse<boolean> | AppError>;
}
