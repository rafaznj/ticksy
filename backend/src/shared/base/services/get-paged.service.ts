import type { IBaseGetPagedRepository } from "../repositories/contracts/get-paged";
import type { IBaseGetPagedService } from "./contracts/get-paged";
import { IQueryOptions } from "../../types/query-options";
import { IPagedResult } from "../../types/paged-result";

export class BaseGetPagedService<T> implements IBaseGetPagedService<T> {
  constructor(protected readonly repository: IBaseGetPagedRepository<T>) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<T>> {
    return this.repository.execute(options);
  }
}
