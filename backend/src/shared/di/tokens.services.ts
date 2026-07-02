export const SERVICE_TOKENS = {
  // User
  CreateUserService: Symbol.for("CreateUserService"),
  UpdateUserService: Symbol.for("UpdateUserService"),
  DeleteUserService: Symbol.for("DeleteUserService"),
  CloseUserService: Symbol.for("CloseUserService"),
  AssignUserToAgentService: Symbol.for("AssignUserToAgentService"),
  GetUserByIdService: Symbol.for("GetUserByIdService"),
  GetUserByEmailService: Symbol.for("GetUserByEmailService"),

  // Ticket
  CreateTicketService: Symbol.for("CreateTicketService"),
  UpdateTicketService: Symbol.for("UpdateTicketService"),
  CloseTicketService: Symbol.for("CloseTicketService"),
  AssignTicketToAgentService: Symbol.for("AssignTicketToAgentService"),
  GetTicketByIdService: Symbol.for("GetTicketByIdService"),
} as const;
