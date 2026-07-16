export interface IBaseCreateService<TInput, TOutput> {
  execute(data: TInput): Promise<TOutput>;
}
