import { UserEntity } from "../../entity/user.entity";

export interface IGetUserByEmailService {
  execute(email: string): Promise<UserEntity | null>;
}
