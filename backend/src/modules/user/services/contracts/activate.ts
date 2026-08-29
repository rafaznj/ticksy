export interface IActivateUserService {
  execute(id: string): Promise<boolean>;
}
