import { Injectable } from "@nestjs/common";
import { IGetUserByIdRepository } from "./contracts/get-by-id";
import { user } from "../../../database/drizzle/schema";
import { BaseGetByIdRepository } from "../../../shared/base/repositories/get-by-id.repository";
import { UserModel } from "../models/user-model";

@Injectable()
export class GetUserByIdRepository
  extends BaseGetByIdRepository<UserModel>
  implements IGetUserByIdRepository
{
  constructor() {
    super(user);
  }
}
