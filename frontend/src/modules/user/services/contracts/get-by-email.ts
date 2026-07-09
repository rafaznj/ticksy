import type { User } from "../../entity/user.entity";

export interface IGetUserByEmailService {
  execute(email: string): Promise<User | null>;
}
