import type { LoginDto } from "@/modules/auth/dto/login.dto";

export interface IAuthService {
  login(data: LoginDto): Promise<void>;
  logout(): Promise<void>;
}
