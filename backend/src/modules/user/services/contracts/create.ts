import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateUserDto } from "../../dto/create.dto";
import { UserEntity } from "../../entity/user.entity";

export type ICreateUserService = IBaseCreateService<CreateUserDto, UserEntity>;
