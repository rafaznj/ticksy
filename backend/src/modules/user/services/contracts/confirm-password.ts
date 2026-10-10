export interface IConfirmPasswordService {
  execute(userId: string, password: string): Promise<void>;
}
