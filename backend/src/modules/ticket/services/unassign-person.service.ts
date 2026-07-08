import { IUnassignPersonTicketService } from "./contracts/unassign-person";

export class UnassignPersonService implements IUnassignPersonTicketService {
  execute(id: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
