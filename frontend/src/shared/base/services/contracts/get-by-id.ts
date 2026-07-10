export interface IBaseGetByIdService<TOutput> {
  execute(id: string): Promise<TOutput>;
}
