import { Injectable } from "@nestjs/common";
import type { IUpdateUserRepository } from "./contracts/update";
import { user } from "../../../database/drizzle/schema";
import { BaseUpdateRepository } from "../../../shared/base/repositories/update.repository";
import { UpdateUserDto } from "../dtos/update.dto";

@Injectable()
export class UpdateUserRepository
  extends BaseUpdateRepository<UpdateUserDto>
  implements IUpdateUserRepository
{
  constructor() {
    super(user);
  }
}
