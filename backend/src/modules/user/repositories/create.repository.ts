import { Injectable } from "@nestjs/common";
import { user } from "../../../database/drizzle/schema/user.schema";
import { ICreateUserRepository } from "./contracts/create";
import { BaseCreateRepository } from "../../../shared/base/repositories/create.repository";
import { CreateUserDto } from "../dto/create.dto";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class CreateUserRepository
  extends BaseCreateRepository<CreateUserDto, UserEntity>
  implements ICreateUserRepository
{
  constructor() {
    super(user);
  }
}
