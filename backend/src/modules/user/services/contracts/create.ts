import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateUserDto } from "../../dto/create-user.dm";

export interface ICreateUserService extends IBaseCreateService<CreateUserDto> {}
