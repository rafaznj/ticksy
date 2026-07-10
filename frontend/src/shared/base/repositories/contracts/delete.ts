export interface IBaseDeleteRepository {
  execute(id: string): Promise<boolean>;
}
