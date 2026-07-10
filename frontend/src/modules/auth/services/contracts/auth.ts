export interface IAuthService {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  bootstrap(): Promise<void>;
}
