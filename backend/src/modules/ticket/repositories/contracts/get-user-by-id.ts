import { UserEntity } from "../../../user/entity/user.entity";

export interface IGetUserByTicketIdRepository {
  execute(id: string): Promise<UserEntity | null>;
}
