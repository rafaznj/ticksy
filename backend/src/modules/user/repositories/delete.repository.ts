import { Injectable } from "@nestjs/common";
import { user } from "../../../database/drizzle/schema";
import { BaseDeleteRepository } from "../../../shared/base/repositories/delete.repository";
import { IDeleteUserRepository } from "./contracts/delete";

@Injectable()
export class DeleteUserRepository extends BaseDeleteRepository implements IDeleteUserRepository {
  constructor() {
    super(user);
  }
}
