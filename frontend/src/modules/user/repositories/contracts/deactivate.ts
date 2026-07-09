export interface IDeactivateUserRepository {
  execute(id: string): Promise<boolean>;
}
