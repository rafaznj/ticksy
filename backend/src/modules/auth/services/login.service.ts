import { Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import type { IGetUserByEmailService } from "../../user/services/contracts/get-by-email";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { AppException } from "../../../shared/exceptions/app-exception";
import type { IJwtTokenService } from "./contracts/jwt-token";
import type { ILoginService } from "./contracts/login";
import { LoginViewModel } from "../view-models/login.vm";
import { LoginData } from "../data/login.data";

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(SERVICE_TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmailService,
    @Inject(SERVICE_TOKENS.JwtTokenService)
    private readonly jwtTokenService: IJwtTokenService,
  ) {}

  async execute(data: LoginData): Promise<LoginViewModel> {
    const user = await this.getUserByEmailService.execute(data.email);
    if (!user || !(await argon2.verify(user.password, data.password))) {
      throw AppException.unauthorized("auth.messages.errors.invalidCredentials");
    }

    const accessToken = this.jwtTokenService.signAccessToken(user.id, user.email);
    const refreshToken = this.jwtTokenService.signRefreshToken(user.id);

    await this.jwtTokenService.create(user.id, await argon2.hash(refreshToken));

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
