import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IRefreshTokenRepository } from "../repositories/contracts/refresh-token";
import type { IJwtTokenService, RefreshTokenPayload } from "./contracts/jwt-token";

@Injectable()
export class JwtTokenService implements IJwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(REPOSITORY_TOKENS.RefreshTokenRepository)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async create(userId: string, tokenHash: string) {
    await this.refreshTokenRepository.create(userId, tokenHash);
  }

  async findActiveByUserId(userId: string) {
    return this.refreshTokenRepository.findActiveByUserId(userId);
  }

  async revoke(userId: string) {
    await this.refreshTokenRepository.revoke(userId);
  }

  signAccessToken(userId: string, email: string) {
    return this.jwtService.sign(
      { sub: userId, email },
      {
        secret: this.configService.get<string>("jwt.accessSecret"),
        expiresIn: this.configService.get<number>("jwt.accessExpirationMs"),
      },
    );
  }

  signRefreshToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>("jwt.refreshSecret"),
        expiresIn: this.configService.get<number>("jwt.refreshExpirationMs"),
      },
    );
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return this.jwtService.verify<RefreshTokenPayload>(token, {
      secret: this.configService.get<string>("jwt.refreshSecret"),
    });
  }
}
