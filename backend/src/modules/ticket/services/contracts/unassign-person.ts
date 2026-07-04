export interface IUnassignPersonTicketService {
  execute(id: string, userId: string): Promise<void>;
}
