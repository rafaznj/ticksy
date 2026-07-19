import type { AppError } from "@/shared/errors/app-error";
import type { UserEntity } from "../../entity/user.entity";

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<UserEntity | AppError>;
}
