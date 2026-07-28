import { user } from "../../../database/drizzle/schema";
import { BaseGetPagedRepository } from "../../../shared/base/repositories/get-paged.repository";
import { UserModel } from "../models/user-model";
import { IGetUserPagedRepository } from "./contracts/get-paged";

export class GetUserPagedRepository
  extends BaseGetPagedRepository<UserModel>
  implements IGetUserPagedRepository
{
  constructor() {
    super(user);
  }
}
