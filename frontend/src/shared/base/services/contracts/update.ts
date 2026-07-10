export interface IBaseUpdateService<TInput, TOutput> {
  execute(id: string, data: TInput): Promise<TOutput>;
}
