import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateUserDto } from "../../dto/create-user.dto";

export type ICreateUserService = IBaseCreateService<CreateUserDto>;
