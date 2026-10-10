import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";
import type { UserDto } from "../../dto/user.dto";
import type { CreateUserData } from "@/modules/user/data/create.data";

export interface ICreateUserRepository extends IBaseCreateRepository<CreateUserData, UserDto> {}
