import type { IBaseUpdateRepository } from "@/shared/base/repositories/contracts/update";
import type { UpdateUserDto } from "../../dto/update-user.dto";

export type IUpdateUserRepository = IBaseUpdateRepository<UpdateUserDto>;
