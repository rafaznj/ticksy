import { IBaseUpdateRepository } from "../../../../shared/base/repositories/contracts/update";
import { UpdateUserDto } from "../../dto/update-user.dto";

export interface IUpdateUserRepository extends IBaseUpdateRepository<UpdateUserDto> {}
