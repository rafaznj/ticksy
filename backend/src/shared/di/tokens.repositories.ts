export const REPOSITORY_TOKENS = {
  // User
  CreateUserRepository: Symbol.for("CreateUserRepository"),
  UpdateUserRepository: Symbol.for("UpdateUserRepository"),
  DeactivateUserRepository: Symbol.for("DeactivateUserRepository"),
  GetUserByIdRepository: Symbol.for("GetUserByIdRepository"),
  GetUserByEmailRepository: Symbol.for("GetUserByEmailRepository"),
  GetUserPagedRepository: Symbol.for("GetUserPagedRepository"),

  // Ticket
  CreateTicketRepository: Symbol.for("CreateTicketRepository"),
  UpdateTicketRepository: Symbol.for("UpdateTicketRepository"),
  DeleteTicketRepository: Symbol.for("DeleteTicketRepository"),
  GetTicketByIdRepository: Symbol.for("GetTicketByIdRepository"),
  GetTicketPagedRepository: Symbol.for("GetTicketPagedRepository"),
} as const;
