import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable } from "inversify";
import type { User } from "@/modules/user/entity/user.entity";
import type { LoginDto } from "../dto/login.dto";
import type { IAuthRepository } from "./contracts/auth";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";

@injectable()
export class AuthRepository implements IAuthRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;
  async login(dto: LoginDto): Promise<{ accessToken: string; user: User }> {
    const { data } = await this.axiosSingleton.client.post<{ accessToken: string; user: User }>(
      "/auth/login",
      dto,
    );
    return data;
  }

  async logout(): Promise<void> {
    await this.axiosSingleton.client.post("/auth/logout");
  }

  async refresh(): Promise<{ accessToken: string }> {
    const { data } = await this.axiosSingleton.client.post<{ accessToken: string }>(
      "/auth/refresh",
    );
    return data;
  }

  async me(): Promise<User> {
    const { data } = await this.axiosSingleton.client.get<User>("/auth/me");
    return data;
  }
}
