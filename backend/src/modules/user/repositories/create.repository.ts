import { Injectable } from "@nestjs/common";
import { users } from "../../../database/drizzle/schema/users.schema";
import { ICreateUserRepository } from "./contracts/create";
import { BaseCreateRepository } from "../../../shared/base/repositories/create.repository";
import { UserViewModel } from "../view-models/user.vm";
import { CreateUserData } from "../data/create.data";

@Injectable()
export class CreateUserRepository
  extends BaseCreateRepository<CreateUserData, UserViewModel>
  implements ICreateUserRepository
{
  constructor() {
    super(users);
  }
}
