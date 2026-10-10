import type { LoginData } from "../../data/login.data";
import { LoginViewModel } from "../../view-models/login.vm";

export interface ILoginService {
  execute(data: LoginData): Promise<LoginViewModel>;
}
