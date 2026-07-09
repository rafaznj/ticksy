export interface IDeactivateUserService {
  execute(id: string): Promise<boolean>;
}
