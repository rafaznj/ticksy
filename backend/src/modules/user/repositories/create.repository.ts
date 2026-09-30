import { Injectable } from "@nestjs/common";
import { users } from "../../../database/drizzle/schema/users.schema";
import { ICreateUserRepository } from "./contracts/create";
import { BaseCreateRepository } from "../../../shared/base/repositories/create.repository";
import { CreateUserDto } from "../dtos/create.dto";
import { UserModel } from "../models/user-model";

@Injectable()
export class CreateUserRepository
  extends BaseCreateRepository<CreateUserDto, UserModel>
  implements ICreateUserRepository
{
  constructor() {
    super(users);
  }
}
