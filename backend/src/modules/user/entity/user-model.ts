import { UserEntity } from "./user.entity";

export type UserModel = Omit<UserEntity, "password">;
