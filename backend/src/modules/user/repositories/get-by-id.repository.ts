import { Injectable } from "@nestjs/common";
import { IGetUserByIdRepository } from "./contracts/get-by-id";
import { users } from "../../../database/drizzle/schema";
import { BaseGetByIdRepository } from "../../../shared/base/repositories/get-by-id.repository";
import { UserViewModel } from "../view-models/user.vm";

@Injectable()
export class GetUserByIdRepository
  extends BaseGetByIdRepository<UserViewModel>
  implements IGetUserByIdRepository
{
  constructor() {
    super(users);
  }
}
