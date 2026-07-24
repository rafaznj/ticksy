import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateUserDto } from "../../dtos/create.dto";
import { UserModel } from "../../models/user-model";

export type ICreateUserService = IBaseCreateService<CreateUserDto, UserModel>;
