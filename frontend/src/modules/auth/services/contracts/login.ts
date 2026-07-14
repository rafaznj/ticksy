import type { LoginResponse } from "@/modules/auth/dto/login-response";
import type { LoginDto } from "@/modules/auth/dto/login.dto";

export interface ILoginService {
  execute(data: LoginDto): Promise<LoginResponse>;
}
