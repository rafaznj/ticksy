export interface IBaseUpdateRepository<TInput, TOutput> {
  execute(id: string, data: TInput): Promise<TOutput | null>;
}
