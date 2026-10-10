import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateUserData } from "../../data/create.data";
import { UserViewModel } from "../../view-models/user.vm";

export type ICreateUserService = IBaseCreateService<CreateUserData, UserViewModel>;
