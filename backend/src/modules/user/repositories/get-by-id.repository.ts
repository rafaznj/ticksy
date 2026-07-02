import { Injectable } from "@nestjs/common";
import { IGetUserByIdRepository } from "./contracts/get-by-id";
import { user } from "../../../database/drizzle/schema";
import { CreateUserDto } from "../dto/create-user.dto";
import { BaseGetByIdRepository } from "../../../shared/base/repositories/get-by-id.repository";

@Injectable()
export class GetUserByIdRepository
  extends BaseGetByIdRepository<CreateUserDto>
  implements IGetUserByIdRepository
{
  constructor() {
    super(user);
  }
}
