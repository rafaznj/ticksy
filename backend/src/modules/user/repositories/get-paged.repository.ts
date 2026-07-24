import { user } from "../../../database/drizzle/schema";
import { BaseGetPagedRepository } from "../../../shared/base/repositories/get-paged.repository";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IQueryOptions } from "../../../shared/types/query-options";
import { UserModel } from "../models/user-model";
import { IGetUserPagedRepository } from "./contracts/get-paged";

export class GetUserPagedRepository
  extends BaseGetPagedRepository<UserModel>
  implements IGetUserPagedRepository
{
  constructor() {
    super(user);
  }

  async execute(options: IQueryOptions): Promise<IPagedResult<UserModel>> {
    const response = await super.execute(options);
    return response;
  }
}
