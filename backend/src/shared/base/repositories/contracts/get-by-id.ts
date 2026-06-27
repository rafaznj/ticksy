export interface IBaseGetByIdRepository<T> {
  execute(id: string): Promise<T | null>;
}
