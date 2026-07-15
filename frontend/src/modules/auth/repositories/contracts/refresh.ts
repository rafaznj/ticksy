import type { RefreshResponse } from "@/modules/auth/dto/refresh-response.dto";
import type { AppError } from "@/shared/errors/app-error";

export interface IRefreshRepository {
  execute(): Promise<RefreshResponse | AppError>;
}
