import type { IBaseUpdateRepository } from "@/shared/base/repositories/contracts/update";
import type { UpdateUserDto } from "../../dto/update-user.dto";
import type { User } from "../../entity/user.entity";

export type IUpdateUserRepository = IBaseUpdateRepository<UpdateUserDto, User>;
