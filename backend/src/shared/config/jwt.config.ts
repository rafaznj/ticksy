import { registerAs } from "@nestjs/config";

export const jwtConfig = registerAs("jwt", () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  accessExpirationSeconds: Number(process.env.JWT_ACCESS_EXPIRATION_SECONDS),
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpirationSeconds: Number(process.env.JWT_REFRESH_EXPIRATION_SECONDS),
}));
