export interface IBaseCreateRepository<T> {
  execute(data: T): Promise<T | null>;
}
