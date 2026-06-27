export interface IBaseGetByIdService<T> {
  execute(id: string): Promise<T>;
}
