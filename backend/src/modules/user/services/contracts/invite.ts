import type { CreateUserData } from "../../data/create.data";

export interface IInviteUserService {
  execute(data: CreateUserData): Promise<void>;
}
