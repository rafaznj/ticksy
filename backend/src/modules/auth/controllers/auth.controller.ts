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
import type { IRegisterService } from "../services/contracts/register";
import { UserModel } from "../../user/models/user-model";
import { OptionalJwtAuthGuard } from "../guards/optional-jwt-auth.guard";
import { CreateUserDto } from "../../user/dtos/create.dto";

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

  @Post("/register")
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.registerService.execute(dto);

    setRefreshCookie(res, refreshToken, this.configService);

    return {
      accessToken,
      user,
    };
  }

  @Post("/login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.loginService.execute(
      dto.email,
      dto.password,
    );

    setRefreshCookie(res, refreshToken, this.configService);
    return { accessToken, user };
  }

  @Post("/logout")
  @UseGuards(OptionalJwtAuthGuard)
  async logout(
    @Req() req: Request & { user: { id: string } | null },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (req.user?.id) {
      await this.logoutService.execute(req.user.id);
    }

    res.clearCookie("refreshToken");
    return { success: true };
  }

  @Post("/refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw AppException.unauthorized("auth.errors.refreshTokenMissing");
    }

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await this.refreshService.execute(refreshToken);

      setRefreshCookie(res, newRefreshToken, this.configService);
      return { accessToken };
    } catch (error) {
      res.clearCookie("refreshToken");
      throw error;
    }
  }

  @Get("/me")
  @UseGuards(AuthGuard("jwt"))
  async me(@Req() req: Request & { user: Omit<UserModel, "password"> }) {
    return req.user;
  }
}
