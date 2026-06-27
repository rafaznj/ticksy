export const REPOSITORY_TOKENS = {
  // Ticket
  CreateTicketRepository: Symbol("CreateTicketRepository"),
  UpdateTicketRepository: Symbol("UpdateTicketRepository"),
  DeleteTicketRepository: Symbol("DeleteTicketRepository"),
  GetTicketByIdRepository: Symbol("GetTicketByIdRepository"),
  GetTicketPagedRepository: Symbol("GetTicketPagedRepository"),
} as const;
