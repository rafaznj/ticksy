import { Inject, Injectable } from "@nestjs/common";

import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IJwtTokenService } from "./contracts/jwt-token";
import type { ILogoutService } from "./contracts/logout";

@Injectable()
export class LogoutService implements ILogoutService {
  constructor(
    @Inject(SERVICE_TOKENS.JwtTokenService)
    private readonly jwtTokenService: IJwtTokenService,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.jwtTokenService.revoke(userId);
  }
}
