import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { User } from "../../entity/user.entity";

export interface ICreateUserRepository extends IBaseCreateRepository<User> {}
