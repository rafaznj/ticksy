import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateUserDto } from "../../dto/update-user.dto";
import type { UserEntity } from "../../entity/user.entity";

export type IUpdateUserService = IBaseUpdateService<UpdateUserDto, UserEntity>;
