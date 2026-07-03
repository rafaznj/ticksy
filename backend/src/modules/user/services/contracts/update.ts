import { IBaseUpdateService } from "../../../../shared/base/services/contracts/update";
import { UpdateUserDto } from "../../dto/update-user.dto";

export interface IUpdateUserService extends IBaseUpdateService<UpdateUserDto> {}
