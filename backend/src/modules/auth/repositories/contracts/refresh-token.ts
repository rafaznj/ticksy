export interface IRefreshTokenRepository {
  create(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
  findActiveByUserId(userId: string): Promise<{ id: string; tokenHash: string } | null>;
  revoke(userId: string): Promise<void>;
}
