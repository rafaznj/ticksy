import { User } from "../../../user/entity/user.entity";

export interface IGetUserByTicketIdRepository {
  execute(id: string): Promise<User | null>;
}
