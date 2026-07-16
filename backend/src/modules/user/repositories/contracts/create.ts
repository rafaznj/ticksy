import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { CreateUserDto } from "../../dto/create.dto";
import { UserEntity } from "../../entity/user.entity";

export type ICreateUserRepository = IBaseCreateRepository<CreateUserDto, UserEntity>;
