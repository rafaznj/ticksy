export interface IBaseDeleteService {
  execute(id: string): Promise<boolean>;
}
