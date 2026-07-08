export interface IAssignTicketService {
  execute(id: string, userId: string): Promise<void>;
}
