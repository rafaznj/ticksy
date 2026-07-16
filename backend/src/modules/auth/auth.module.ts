import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from "./controllers/auth.controller";

import { REPOSITORY_TOKENS } from "../../shared/di/tokens.repositories";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshTokenRepository } from "./repositories/refresh-token.repository";
import { SERVICE_TOKENS } from "../../shared/di/tokens.services";
import { LoginService } from "./services/login.service";
import { RefreshService } from "./services/refresh.service";
import { LogoutService } from "./services/logout.service";
import { JwtTokenService } from "./services/jwt-token.service";
import { UserModule } from "../user/user.module";
import { RegisterService } from "./services/register.service";

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.accessSecret"),
        signOptions: {
          expiresIn: configService.get<number>("jwt.accessExpirationMs"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: REPOSITORY_TOKENS.RefreshTokenRepository,
      useClass: RefreshTokenRepository,
    },
    {
      provide: SERVICE_TOKENS.RefreshService,
      useClass: RefreshService,
    },
    {
      provide: SERVICE_TOKENS.LoginService,
      useClass: LoginService,
    },
    {
      provide: SERVICE_TOKENS.RegisterService,
      useClass: RegisterService,
    },
    {
      provide: SERVICE_TOKENS.LogoutService,
      useClass: LogoutService,
    },
    {
      provide: SERVICE_TOKENS.JwtTokenService,
      useClass: JwtTokenService,
    },
  ],
})
export class AuthModule {}
