import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateUserDto } from "../../dto/update-user.dto";
import type { User } from "../../entity/user.entity";

export type IUpdateUserService = IBaseUpdateService<UpdateUserDto, User>;
