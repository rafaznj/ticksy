import { ForgotPasswordData } from "../../data/forgot-password.data";

export interface IForgotPasswordUserService {
  execute(data: ForgotPasswordData): Promise<void>;
}
