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
  DeleteTicketService: Symbol.for("DeleteTicketService"),
  AssignTicketService: Symbol.for("AssignTicketService"),
  UnassignTicketService: Symbol.for("UnassignTicketService"),
  GetTicketByIdService: Symbol.for("GetTicketByIdService"),
  ChangeTicketStatusService: Symbol.for("ChangeTicketStatusService"),
} as const;
