import { Injectable } from "@nestjs/common";
import { IAssignTicketService } from "./contracts/assign";

@Injectable()
export class AssignTicketService implements IAssignTicketService {
  constructor() {}
  execute(id: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
