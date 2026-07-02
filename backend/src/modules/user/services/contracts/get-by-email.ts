import { CreateUserDto } from "../../dto/create-user.dto";

export interface IGetUserByEmailService {
  execute(email: string): Promise<CreateUserDto | null>;
}
