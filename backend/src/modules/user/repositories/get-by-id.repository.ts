import { Injectable } from "@nestjs/common";
import { IGetUserByIdRepository } from "./contracts/get-by-id";
import { user } from "../../../database/drizzle/schema";
import { BaseGetByIdRepository } from "../../../shared/base/repositories/get-by-id.repository";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class GetUserByIdRepository
  extends BaseGetByIdRepository<UserEntity>
  implements IGetUserByIdRepository
{
  constructor() {
    super(user);
  }
}
