export interface IBaseCreateService<T> {
  execute(data: T): Promise<T>;
}
