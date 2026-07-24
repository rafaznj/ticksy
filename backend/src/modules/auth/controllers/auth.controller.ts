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
import { setRefreshCookie } from "../../../shared/utils/set-refresh-cookie";
import { CreateUserDto } from "../../user/dtos/create.dto";
import type { IRegisterService } from "../services/contracts/register";
import { UserModel } from "../../user/models/user-model";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(SERVICE_TOKENS.LoginService)
    private readonly loginService: ILoginService,
    @Inject(SERVICE_TOKENS.RegisterService)
    private readonly registerService: IRegisterService,
    private readonly configService: ConfigService,
    @Inject(SERVICE_TOKENS.RefreshService)
    private readonly refreshService: IRefreshService,
    @Inject(SERVICE_TOKENS.LogoutService)
    private readonly logoutService: ILogoutService,
  ) {}

  @Post("/login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.loginService.execute(
      dto.email,
      dto.password,
    );

    setRefreshCookie(res, refreshToken, this.configService);
    return { accessToken, user };
  }

  @Post("/register")
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.registerService.execute(dto);

    setRefreshCookie(res, refreshToken, this.configService);

    return {
      accessToken,
      user,
    };
  }

  @Post("/refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw AppException.unauthorized("auth.errors.refreshTokenMissing");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshService.execute(refreshToken);

    setRefreshCookie(res, newRefreshToken, this.configService);
    return { accessToken };
  }

  @Get("/me")
  @UseGuards(AuthGuard("jwt"))
  async me(@Req() req: Request & { user: UserModel }) {
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
