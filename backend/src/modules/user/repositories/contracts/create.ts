import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { CreateUserData } from "../../data/create.data";
import { UserViewModel } from "../../view-models/user.vm";

export type ICreateUserRepository = IBaseCreateRepository<CreateUserData, UserViewModel>;
