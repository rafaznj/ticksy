import { Inject, Injectable } from "@nestjs/common";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { ICreateUserService } from "../../user/services/contracts/create";
import type { IJwtTokenService } from "./contracts/jwt-token";
import { CreateUserDto } from "../../user/dto/create.dto";
import { RegisterResult } from "../dto/register-result.dto";
import * as argon2 from "argon2";
import { IRegisterService } from "./contracts/register";

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @Inject(SERVICE_TOKENS.CreateUserService)
    private readonly createUserService: ICreateUserService,

    @Inject(SERVICE_TOKENS.JwtTokenService)
    private readonly jwtTokenService: IJwtTokenService,
  ) {}

  async execute(data: CreateUserDto): Promise<RegisterResult> {
    const user = await this.createUserService.execute(data);

    const accessToken = this.jwtTokenService.signAccessToken(user.id, user.email);

    const refreshToken = this.jwtTokenService.signRefreshToken(user.id);

    await this.jwtTokenService.create(user.id, await argon2.hash(refreshToken));

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
