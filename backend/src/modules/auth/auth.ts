import { User } from "../user/entity/user.entity";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>; // adicionar
  saveRefreshToken(userId: string, tokenHash: string): Promise<void>;
  findValidRefreshToken(userId: string): Promise<{ id: string; tokenHash: string } | null>;
  revokeRefreshToken(userId: string): Promise<void>;
}
