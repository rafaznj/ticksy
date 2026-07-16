import type { AppError } from "@/shared/errors/app-error";
import type { User } from "../../entity/user.entity";

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<User | AppError>;
}
