import type { LoginResult } from "../../dto/login-result";

export interface ILoginService {
  execute(email: string, password: string): Promise<LoginResult>;
}
