export interface IBaseGetByIdRepository<TOutput> {
  execute(id: string): Promise<TOutput | null>;
}
