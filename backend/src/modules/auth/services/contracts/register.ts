import { CreateUserDto } from "../../../user/dto/create.dto";
import { RegisterResult } from "../../dto/register-result.dto";

export interface IRegisterService {
  execute(data: CreateUserDto): Promise<RegisterResult>;
}
