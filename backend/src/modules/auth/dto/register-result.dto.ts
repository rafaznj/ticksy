export interface RegisterResult {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string };
}
