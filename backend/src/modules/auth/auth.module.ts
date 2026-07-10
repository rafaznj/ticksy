import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from "./controllers/auth.controller";

import { REPOSITORY_TOKENS } from "../../shared/di/tokens.repositories";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule,
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
    AuthService,
    JwtStrategy,
    {
      provide: REPOSITORY_TOKENS.AuthRepository,
      useClass: AuthRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
