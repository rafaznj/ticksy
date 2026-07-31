import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetUserByIdService } from "../../user/services/contracts/get-by-id";

interface JwtPayload {
  sub: string;
  email?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject(SERVICE_TOKENS.GetUserByIdService)
    private readonly getUserByIdService: IGetUserByIdService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("jwt.accessSecret")!,
    });
  }

  async validate(payload: JwtPayload) {
    const response = await this.getUserByIdService.execute(payload.sub);

    if (!response) {
      throw new UnauthorizedException("auth.errors.userNotFound");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = response;

    return user;
  }
}
