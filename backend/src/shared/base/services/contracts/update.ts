export interface IBaseUpdateService<T> {
  execute(id: string, data: Partial<T>): Promise<boolean>;
}
