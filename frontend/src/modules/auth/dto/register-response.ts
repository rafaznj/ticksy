export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string };
}
