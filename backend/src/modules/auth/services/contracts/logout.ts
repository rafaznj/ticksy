export interface ILogoutService {
  execute(userId: string): Promise<void>;
}
