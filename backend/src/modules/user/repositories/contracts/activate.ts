export interface IActivateUserRepository {
  execute(id: string): Promise<boolean>;
}
