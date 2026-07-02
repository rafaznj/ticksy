import { UpdateUserDto } from "../../dto/update-user.dto";

export interface IUpdateUserService {
  execute(id: string, data: Partial<UpdateUserDto>): Promise<UpdateUserDto>;
}
