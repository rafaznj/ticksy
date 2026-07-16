export interface RefreshTokenPayload {
  sub: string;
}

export interface IJwtTokenService {
  signAccessToken(userId: string, email: string): string;
  signRefreshToken(userId: string): string;
  verifyRefreshToken(token: string): RefreshTokenPayload;
  create(userId: string, tokenHash: string): Promise<void>;
  findActiveByUserId(userId: string): Promise<{ id: string; tokenHash: string } | null>;
  revoke(userId: string): Promise<void>;
}
