import { Injectable } from "@nestjs/common";
import { user } from "../../../database/drizzle/schema";
import { BaseCreateRepository } from "../../../shared/base/repositories/create.repository";
import { User } from "../entity/user.entity";
import { ICreateUserRepository } from "./contracts/create";

@Injectable()
export class CreateUserRepository
  extends BaseCreateRepository<User>
  implements ICreateUserRepository
{
  constructor() {
    super(user);
  }
}
