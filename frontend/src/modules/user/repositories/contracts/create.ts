import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";
import type { CreateUserDto } from "../../dto/create-user.dto";
import type { User } from "../../entity/user.entity";

export type ICreateUserRepository = IBaseCreateRepository<CreateUserDto, User>;
