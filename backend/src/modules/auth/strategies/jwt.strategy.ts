import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IAuthRepository } from "../auth";

interface JwtPayload {
  sub: string;
  email?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject(REPOSITORY_TOKENS.AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("jwt.accessSecret")!,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("Usuário não encontrado");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
