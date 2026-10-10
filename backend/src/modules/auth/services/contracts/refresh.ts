import { RefreshTokenViewModel } from "../../view-models/refresh-token.vm";

export interface IRefreshService {
  execute(refreshToken: string): Promise<RefreshTokenViewModel>;
}
