import { CreateUserDto } from "../../../user/dtos/create.dto";
import { RegisterViewModel } from "../../view-models/register.vm";

export interface IRegisterService {
  execute(data: CreateUserDto): Promise<RegisterViewModel>;
}
