import type { RefreshDto } from "@/modules/auth/dto/refresh.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IRefreshRepository {
  execute(): Promise<APIResponse<RefreshDto> | AppError>;
}
