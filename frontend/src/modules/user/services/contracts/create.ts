import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import type { UserDto } from "../../dto/user.dto";
import type { CreateUserData } from "@/modules/user/data/create.data";

export interface ICreateUserService extends IBaseCreateService<CreateUserData, UserDto> {}
