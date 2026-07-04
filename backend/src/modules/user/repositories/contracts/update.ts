import { IBaseUpdateRepository } from "../../../../shared/base/repositories/contracts/update";
import { UpdateUserDto } from "../../dto/update-user.dto";

export type IUpdateUserRepository = IBaseUpdateRepository<UpdateUserDto>;
