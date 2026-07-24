import { CreateUserDto } from "../../../user/dtos/create.dto";
import { RegisterResult } from "../../dto/register-result.dto";

export interface IRegisterService {
  execute(data: CreateUserDto): Promise<RegisterResult>;
}
