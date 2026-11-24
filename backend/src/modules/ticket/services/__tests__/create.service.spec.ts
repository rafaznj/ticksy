import { Test, TestingModule } from "@nestjs/testing";

import { ICreateNotificationService } from "../../../notification/services/contracts/create";
import { IGetUserIdsByRoleService } from "../../../user/services/contracts/get-ids-by-role";
import { TicketCategoryEnum } from "../../enums/ticket-category.enum";
import { TicketPriorityEnum } from "../../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../../enums/ticket-status.enum";
import { ICreateTicketRepository } from "../../repositories/contracts/create";
import { CreateTicketService } from "../create.service";
import { CreateTicketDto } from "../../dtos/create.dto";
import { TicketViewModel } from "../../view-models/ticket.vm";
import { REPOSITORY_TOKENS } from "../../../../shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "../../../../shared/di/tokens.services";
import { AppException } from "../../../../shared/exceptions/app-exception";
import { NotificationTypeEnum } from "../../../notification/enums/notification-type.enum";
import { UserRoleEnum } from "../../../user/enums/role.enum";

describe("CreateTicketService", () => {
  let service: CreateTicketService;
  let createTicketRepository: jest.Mocked<ICreateTicketRepository>;
  let createNotificationService: jest.Mocked<ICreateNotificationService>;
  let getUserIdsByRoleService: jest.Mocked<IGetUserIdsByRoleService>;

  const mockCreateTicket: CreateTicketDto = {
    title: "Printer doesn't turn on",
    description: "Printer is not responding when I press the power button.",
    category: TicketCategoryEnum.HARDWARE,
    priority: TicketPriorityEnum.HIGH,
    createdById: "user-creator-id",
  };

  const mockCreatedTicket: TicketViewModel = {
    id: "ticket-uuid-1",
    code: 101,
    title: "Printer doesn't turn on",
    description: "Printer is not responding when I press the power button.",
    category: TicketCategoryEnum.HARDWARE,
    priority: TicketPriorityEnum.HIGH,
    status: TicketStatusEnum.OPEN,
    createdById: "user-creator-id",
    createdByName: "John Doe",
    assignedToId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    createTicketRepository = {
      execute: jest.fn().mockResolvedValue(mockCreatedTicket),
    } as jest.Mocked<ICreateTicketRepository>;

    createNotificationService = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as jest.Mocked<ICreateNotificationService>;

    getUserIdsByRoleService = {
      execute: jest.fn().mockResolvedValue(["admin-1", "admin-2"]),
    } as jest.Mocked<IGetUserIdsByRoleService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTicketService,
        {
          provide: REPOSITORY_TOKENS.CreateTicketRepository,
          useValue: createTicketRepository,
        },
        {
          provide: SERVICE_TOKENS.CreateNotificationService,
          useValue: createNotificationService,
        },
        {
          provide: SERVICE_TOKENS.GetUserIdsByRoleService,
          useValue: getUserIdsByRoleService,
        },
      ],
    }).compile();

    service = module.get<CreateTicketService>(CreateTicketService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("execute", () => {
    it("should create the ticket and notify the admins", async () => {
      const result = await service.execute(mockCreateTicket);

      expect(result).toEqual(mockCreatedTicket);

      expect(createTicketRepository.execute).toHaveBeenCalledWith(mockCreateTicket);

      expect(createNotificationService.execute).toHaveBeenCalledWith({
        type: NotificationTypeEnum.TICKET_CREATED,
        ticketId: mockCreatedTicket.id,
        parameters: {
          userName: mockCreatedTicket.createdByName,
          title: mockCreatedTicket.title,
        },
        userIds: ["admin-1", "admin-2"],
      });
    });

    it("should look up the users with the admin role", async () => {
      await service.execute(mockCreateTicket);

      expect(getUserIdsByRoleService.execute).toHaveBeenCalledWith(UserRoleEnum.ADMIN);
    });

    it("should create the ticket before looking up admins and notifying", async () => {
      await service.execute(mockCreateTicket);

      const [repoOrder] = createTicketRepository.execute.mock.invocationCallOrder;
      const [adminsOrder] = getUserIdsByRoleService.execute.mock.invocationCallOrder;
      const [notificationOrder] = createNotificationService.execute.mock.invocationCallOrder;

      expect(repoOrder).toBeLessThan(adminsOrder);
      expect(adminsOrder).toBeLessThan(notificationOrder);
    });

    it("should notify with an empty user list when there are no admins", async () => {
      getUserIdsByRoleService.execute.mockResolvedValueOnce([]);

      const result = await service.execute(mockCreateTicket);

      expect(result).toEqual(mockCreatedTicket);
      expect(createNotificationService.execute).toHaveBeenCalledWith(
        expect.objectContaining({ userIds: [] }),
      );
    });

    it("should propagate the error and skip the notification when the repository throws", async () => {
      createTicketRepository.execute.mockRejectedValueOnce(new Error("db down"));

      await expect(service.execute(mockCreateTicket)).rejects.toThrow("db down");

      expect(getUserIdsByRoleService.execute).not.toHaveBeenCalled();
      expect(createNotificationService.execute).not.toHaveBeenCalled();
    });

    it("should throw AppException and skip the notification when the repository returns nothing", async () => {
      createTicketRepository.execute.mockResolvedValueOnce(null as never);

      await expect(service.execute(mockCreateTicket)).rejects.toThrow(AppException);

      expect(getUserIdsByRoleService.execute).not.toHaveBeenCalled();
      expect(createNotificationService.execute).not.toHaveBeenCalled();
    });

    it("should propagate the error and skip the notification when the admin lookup fails", async () => {
      getUserIdsByRoleService.execute.mockRejectedValueOnce(new Error("lookup failed"));

      await expect(service.execute(mockCreateTicket)).rejects.toThrow("lookup failed");

      expect(createNotificationService.execute).not.toHaveBeenCalled();
    });

    it("should reject even though the ticket was already created when the notification fails", async () => {
      createNotificationService.execute.mockRejectedValueOnce(new Error("notification failed"));

      await expect(service.execute(mockCreateTicket)).rejects.toThrow("notification failed");

      expect(createTicketRepository.execute).toHaveBeenCalledWith(mockCreateTicket);
    });
  });
});
