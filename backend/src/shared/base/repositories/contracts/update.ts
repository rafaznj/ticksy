export interface IBaseUpdateRepository<T> {
  execute(id: string, data: Partial<T>): Promise<T | null>;
}
