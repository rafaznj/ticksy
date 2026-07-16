export interface IRefreshTokenRepository {
  create(userId: string, tokenHash: string): Promise<void>;
  findActiveByUserId(userId: string): Promise<{ id: string; tokenHash: string } | null>;
  revoke(userId: string): Promise<void>;
}
