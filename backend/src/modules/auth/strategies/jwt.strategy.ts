import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IRefreshTokenRepository } from "../repositories/contracts/refresh-token";

interface JwtPayload {
  sub: string;
  email?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject(REPOSITORY_TOKENS.RefreshTokenRepository)
    private readonly tokenRepository: IRefreshTokenRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("jwt.accessSecret")!,
    });
  }

  async validate(payload: JwtPayload) {
    const result = await this.tokenRepository.findActiveByUserId(payload.sub);
    if (!result) {
      throw new UnauthorizedException("Usuário não encontrado");
    }

    return result;
  }
}
