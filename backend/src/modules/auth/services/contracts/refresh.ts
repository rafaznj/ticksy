import type { RefreshResult } from "../../dto/refresh-result";

export interface IRefreshService {
  execute(refreshToken: string): Promise<RefreshResult>;
}
