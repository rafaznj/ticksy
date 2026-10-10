import { CreateUserData } from "./create.data";

export interface UpdateUserData extends CreateUserData {
  deleted?: boolean;
}
