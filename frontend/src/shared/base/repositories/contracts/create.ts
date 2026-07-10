export interface IBaseCreateRepository<TInput, TOutput> {
  execute(data: TInput): Promise<TOutput>;
}
