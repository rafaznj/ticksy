import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { CreateUserDto } from "../../dtos/create.dto";
import { UserModel } from "../../models/user-model";

export type ICreateUserRepository = IBaseCreateRepository<CreateUserDto, UserModel>;
