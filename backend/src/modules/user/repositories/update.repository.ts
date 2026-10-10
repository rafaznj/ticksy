import { Injectable } from "@nestjs/common";
import type { IUpdateUserRepository } from "./contracts/update";
import { users } from "../../../database/drizzle/schema";
import { BaseUpdateRepository } from "../../../shared/base/repositories/update.repository";
import { UpdateUserData } from "../data/update.data";

@Injectable()
export class UpdateUserRepository
  extends BaseUpdateRepository<UpdateUserData>
  implements IUpdateUserRepository
{
  constructor() {
    super(users);
  }
}
