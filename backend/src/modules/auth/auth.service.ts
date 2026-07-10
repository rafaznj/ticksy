import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon2 from "argon2";
import type { IAuthRepository } from "./auth";
import { REPOSITORY_TOKENS } from "../../shared/di/tokens.repositories";

interface RefreshPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORY_TOKENS.AuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private signAccessToken(userId: string, email: string) {
    return this.jwtService.sign(
      { sub: userId, email },
      {
        secret: this.configService.get<string>("jwt.accessSecret"),
        expiresIn: this.configService.get<number>("jwt.accessExpirationMs"),
      },
    );
  }

  private signRefreshToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>("jwt.refreshSecret"),
        expiresIn: this.configService.get<number>("jwt.refreshExpirationMs"),
      },
    );
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const accessToken = this.signAccessToken(user.id, user.email);
    const refreshToken = this.signRefreshToken(user.id);

    // guarda o hash do refresh token pra permitir revogação/checagem depois
    await this.authRepository.saveRefreshToken(user.id, await argon2.hash(refreshToken));

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email },
    };
  }

  async refresh(providedRefreshToken: string) {
    let payload: RefreshPayload;

    try {
      payload = this.jwtService.verify<RefreshPayload>(providedRefreshToken, {
        secret: this.configService.get<string>("jwt.refreshSecret"),
      });
    } catch {
      throw new UnauthorizedException("Refresh token inválido ou expirado");
    }

    const stored = await this.authRepository.findValidRefreshToken(payload.sub);
    if (!stored || !(await argon2.verify(stored.tokenHash, providedRefreshToken))) {
      throw new UnauthorizedException("Refresh token inválido");
    }

    const user = await this.authRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("Usuário não encontrado");
    }

    // rotação: invalida o antigo e emite um par novo
    await this.authRepository.revokeRefreshToken(user.id);
    const accessToken = this.signAccessToken(user.id, user.email);
    const newRefreshToken = this.signRefreshToken(user.id);
    await this.authRepository.saveRefreshToken(user.id, await argon2.hash(newRefreshToken));

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: string) {
    await this.authRepository.revokeRefreshToken(userId);
  }
}
