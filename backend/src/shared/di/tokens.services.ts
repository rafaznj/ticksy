export const SERVICE_TOKENS = {
  // Ticket
  CreateTicketService: Symbol("CreateTicketService"),
  UpdateTicketService: Symbol("UpdateTicketService"),
  CloseTicketService: Symbol("CloseTicketService"),
  AssignTicketToAgentService: Symbol("AssignTicketToAgentService"),
  GetTicketByIdService: Symbol("GetTicketByIdService"),
} as const;
