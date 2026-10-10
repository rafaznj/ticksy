import { registerAs } from "@nestjs/config";

export const jwtConfig = registerAs("jwt", () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  accessExpirationMs: Number(process.env.JWT_ACCESS_EXPIRATION_MS),
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpirationMs: Number(process.env.JWT_REFRESH_EXPIRATION_MS),
}));
