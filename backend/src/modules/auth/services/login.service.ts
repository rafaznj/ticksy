import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

import type { IGetUserByEmailService } from "../../user/services/contracts/get-by-email";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { AppException } from "../../../shared/exceptions/app-exception";
import type { IJwtTokenService } from "./contracts/jwt-token";
import type { ILoginService } from "./contracts/login";
import type { LoginResult } from "../dto/login-result";

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(SERVICE_TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmailService,
    @Inject(SERVICE_TOKENS.JwtTokenService)
    private readonly jwtTokenService: IJwtTokenService,
  ) {}

  async execute(email: string, password: string): Promise<LoginResult> {
    const user = await this.getUserByEmailService.execute(email);
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new AppException(
        [{ key: "general.errors.invalidCredentials", value: "Invalid credentials" }],
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = this.jwtTokenService.signAccessToken(user.id, user.email);
    const refreshToken = this.jwtTokenService.signRefreshToken(user.id);

    await this.jwtTokenService.create(user.id, await argon2.hash(refreshToken));

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email },
    };
  }
}
