import { UserEntity } from "../../entity/user.entity";

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<UserEntity | null>;
}
