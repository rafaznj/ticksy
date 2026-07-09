import { useAuthStore } from "@/lib/zustand/use-auth";
import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IAuthRepository } from "@/modules/auth/repositories/contracts/auth";
import type { IAuthService } from "@/modules/auth/services/contracts/auth";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(REPOSITORY_TOKENS.AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async login(email: string, password: string) {
    const { accessToken, user } = await this.authRepository.login({ email, password });
    useAuthStore.getState().setAuth(accessToken, user);
  }

  async logout() {
    await this.authRepository.logout();
    useAuthStore.getState().clearAuth();
  }

  async bootstrap() {
    try {
      const { accessToken } = await this.authRepository.refresh();
      useAuthStore.setState({ accessToken });
      const user = await this.authRepository.me();
      useAuthStore.getState().setAuth(accessToken, user);
    } catch {
      useAuthStore.getState().clearAuth();
    } finally {
      useAuthStore.getState().setHydrated();
    }
  }
}
