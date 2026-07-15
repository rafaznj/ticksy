import { Body, Controller, Post, Req, Res, UseGuards, Inject, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";

import { LoginDto } from "../dto/login.dto";
import type { ILoginService } from "../services/contracts/login";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IRefreshService } from "../services/contracts/refresh";
import type { ILogoutService } from "../services/contracts/logout";
import { AppException } from "../../../shared/exceptions/app-exception";
import { User } from "../../user/entity/user.entity";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(SERVICE_TOKENS.LoginService)
    private readonly loginService: ILoginService,
    private readonly configService: ConfigService,
    @Inject(SERVICE_TOKENS.RefreshService)
    private readonly refreshService: IRefreshService,
    @Inject(SERVICE_TOKENS.LogoutService)
    private readonly logoutService: ILogoutService,
  ) {}

  private setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: this.configService.get<number>("jwt.refreshExpirationMs"),
    });
  }

  @Post("/login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.loginService.execute(
      dto.email,
      dto.password,
    );

    this.setRefreshCookie(res, refreshToken);
    return { accessToken, user };
  }

  @Post("/refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw AppException.unauthorized("auth.errors.refreshTokenMissing");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshService.execute(refreshToken);

    this.setRefreshCookie(res, newRefreshToken);
    return { accessToken };
  }

  @Get("/me")
  @UseGuards(AuthGuard("jwt"))
  async me(@Req() req: Request & { user: Omit<User, "password"> }) {
    return req.user;
  }

  @Post("/logout")
  @UseGuards(AuthGuard("jwt"))
  async logout(
    @Req() req: Request & { user: { id: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.logoutService.execute(req.user.id);
    res.clearCookie("refreshToken");
    return { success: true };
  }
}
