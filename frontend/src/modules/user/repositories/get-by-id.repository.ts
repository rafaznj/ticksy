import { injectable } from "inversify";
import { BaseGetByIdRepository } from "@/shared/base/repositories/get-by-id.repository";
import type { User } from "../entity/user.entity";
import type { IGetUserByIdRepository } from "./contracts/get-by-id";

@injectable()
export class GetUserByIdRepository
  extends BaseGetByIdRepository<User>
  implements IGetUserByIdRepository
{
  constructor() {
    super("/user");
  }
}
