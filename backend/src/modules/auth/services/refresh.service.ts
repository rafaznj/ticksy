import { Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { AppException } from "../../../shared/exceptions/app-exception";
import type { IJwtTokenService } from "./contracts/jwt-token";
import type { IGetUserByIdService } from "../../user/services/contracts/get-by-id";
import type { IRefreshService } from "./contracts/refresh";
import type { RefreshResult } from "../dto/refresh-result";

@Injectable()
export class RefreshService implements IRefreshService {
  constructor(
    @Inject(SERVICE_TOKENS.JwtTokenService)
    private readonly jwtTokenService: IJwtTokenService,
    @Inject(SERVICE_TOKENS.GetUserByIdService)
    private readonly getUserByIdService: IGetUserByIdService,
  ) {}

  async execute(refreshToken: string): Promise<RefreshResult> {
    const payload = this.jwtTokenService.verifyRefreshToken(refreshToken);

    const stored = await this.jwtTokenService.findActiveByUserId(payload.sub);

    if (!stored || !(await argon2.verify(stored.tokenHash, refreshToken))) {
      throw AppException.unauthorized("auth.errors.refreshTokenInvalid");
    }

    const user = await this.getUserByIdService.execute(payload.sub);

    if (!user) {
      throw AppException.unauthorized("auth.errors.userNotFound");
    }

    await this.jwtTokenService.revoke(user.id);

    const accessToken = this.jwtTokenService.signAccessToken(user.id, user.email);
    const newRefreshToken = this.jwtTokenService.signRefreshToken(user.id);

    await this.jwtTokenService.create(user.id, await argon2.hash(newRefreshToken));

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
