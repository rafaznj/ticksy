import type { CookieOptions, Response } from "express";
import type { ConfigService } from "@nestjs/config";

export function setRefreshCookie(
  res: Response,
  refreshToken: string,
  configService: ConfigService,
) {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: configService.get<number>("jwt.refreshExpirationMs"),
  };
  res.cookie("refreshToken", refreshToken, options);
}
