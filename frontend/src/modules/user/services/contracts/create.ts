import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import type { CreateUserDto } from "../../dto/create-user.dto";
import type { User } from "../../entity/user.entity";

export type ICreateUserService = IBaseCreateService<CreateUserDto, User>;
