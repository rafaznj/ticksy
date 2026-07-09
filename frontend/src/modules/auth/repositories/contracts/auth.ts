import type { User } from "@/modules/user/entity/user.entity";
import type { LoginDto } from "../../dto/login.dto";

export interface IAuthRepository {
  login(dto: LoginDto): Promise<{ accessToken: string; user: User }>;
  logout(): Promise<void>;
  refresh(): Promise<{ accessToken: string }>;
  me(): Promise<User>;
}
