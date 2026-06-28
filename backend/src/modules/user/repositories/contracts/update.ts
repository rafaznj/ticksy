import { IBaseUpdateRepository } from "../../../../shared/base/repositories/contracts/update";
import { UpdateUserDto } from "../../dto/update-user.dm";

export interface IUpdateUserRepository extends IBaseUpdateRepository<UpdateUserDto> {}
