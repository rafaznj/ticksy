import { Test, TestingModule } from "@nestjs/testing";
import { AssignTicketService } from "../assign.service";
import { REPOSITORY_TOKENS } from "../../../../shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "../../../../shared/di/tokens.services";
import { AppException } from "../../../../shared/exceptions/app-exception";
import { NotificationTypeEnum } from "../../../notification/enums/notification-type.enum";
import { TicketCategoryEnum } from "../../enums/ticket-category.enum";
import { TicketPriorityEnum } from "../../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../../enums/ticket-status.enum";
import type { IAssignTicketRepository } from "../../repositories/contracts/assign";
import type { IGetTicketByIdService } from "../contracts/get-by-id";
import type { ICreateNotificationService } from "../../../notification/services/contracts/create";
import type { TicketViewModel } from "../../view-models/ticket.vm";
import type { TicketAssignViewModel } from "../../view-models/assign.vm";

describe("AssignTicketService", () => {
  let service: AssignTicketService;
  let assignTicketRepository: jest.Mocked<IAssignTicketRepository>;
  let getTicketByIdService: jest.Mocked<IGetTicketByIdService>;
  let createNotificationService: jest.Mocked<ICreateNotificationService>;

  const mockTicket: TicketViewModel = {
    id: "ticket-uuid-1",
    code: 101,
    title: "Printer doesn't turn on",
    description: "Printer is not responding when I press the power button.",
    category: TicketCategoryEnum.HARDWARE,
    priority: TicketPriorityEnum.HIGH,
    status: TicketStatusEnum.OPEN,
    createdById: "user-creator-id",
    assignedToId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAssignedTicket: TicketAssignViewModel = {
    id: "ticket-uuid-1",
    code: 101,
    title: "Printer doesn't turn on",
  };

  beforeEach(async () => {
    assignTicketRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IAssignTicketRepository>;

    getTicketByIdService = {
      execute: jest.fn(),
    } as jest.Mocked<IGetTicketByIdService>;

    createNotificationService = {
      execute: jest.fn(),
    } as jest.Mocked<ICreateNotificationService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignTicketService,
        {
          provide: REPOSITORY_TOKENS.AssignTicketRepository,
          useValue: assignTicketRepository,
        },
        {
          provide: SERVICE_TOKENS.GetTicketByIdService,
          useValue: getTicketByIdService,
        },
        {
          provide: SERVICE_TOKENS.CreateNotificationService,
          useValue: createNotificationService,
        },
      ],
    }).compile();

    service = module.get<AssignTicketService>(AssignTicketService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should successfully assign the ticket and trigger a notification", async () => {
    getTicketByIdService.execute.mockResolvedValue(mockTicket);
    assignTicketRepository.execute.mockResolvedValue(mockAssignedTicket);
    createNotificationService.execute.mockResolvedValue(null);

    const result = await service.execute("ticket-uuid-1", "technician-uuid-1");

    expect(result).toEqual(mockAssignedTicket);
    expect(getTicketByIdService.execute).toHaveBeenCalledTimes(1);
    expect(getTicketByIdService.execute).toHaveBeenCalledWith("ticket-uuid-1");

    expect(assignTicketRepository.execute).toHaveBeenCalledTimes(1);
    expect(assignTicketRepository.execute).toHaveBeenCalledWith(
      "ticket-uuid-1",
      "technician-uuid-1",
    );

    expect(createNotificationService.execute).toHaveBeenCalledTimes(1);
    expect(createNotificationService.execute).toHaveBeenCalledWith({
      type: NotificationTypeEnum.TICKET_ASSIGNED,
      ticketId: "ticket-uuid-1",
      parameters: {
        title: "Printer doesn't turn on",
      },
      userIds: ["technician-uuid-1"],
    });
  });

  it("should throw notFound AppException when ticket is not found", async () => {
    getTicketByIdService.execute.mockResolvedValue(null);

    await expect(service.execute("ticket-nonexistent", "technician-uuid-1")).rejects.toThrow(
      AppException,
    );

    expect(getTicketByIdService.execute).toHaveBeenCalledWith("ticket-nonexistent");
    expect(assignTicketRepository.execute).not.toHaveBeenCalled();
    expect(createNotificationService.execute).not.toHaveBeenCalled();
  });

  it("should throw conflict AppException when ticket is already assigned", async () => {
    const alreadyAssignedTicket: TicketViewModel = {
      ...mockTicket,
      assignedToId: "other-technician-id",
    };

    getTicketByIdService.execute.mockResolvedValue(alreadyAssignedTicket);

    await expect(service.execute("ticket-uuid-1", "technician-uuid-1")).rejects.toThrow(
      AppException,
    );

    expect(getTicketByIdService.execute).toHaveBeenCalledWith("ticket-uuid-1");
    expect(assignTicketRepository.execute).not.toHaveBeenCalled();
    expect(createNotificationService.execute).not.toHaveBeenCalled();
  });

  it("should throw notFound AppException when repository fails to update", async () => {
    getTicketByIdService.execute.mockResolvedValue(mockTicket);
    assignTicketRepository.execute.mockResolvedValue(null);

    await expect(service.execute("ticket-uuid-1", "technician-uuid-1")).rejects.toThrow(
      AppException,
    );

    expect(getTicketByIdService.execute).toHaveBeenCalledWith("ticket-uuid-1");
    expect(assignTicketRepository.execute).toHaveBeenCalledWith(
      "ticket-uuid-1",
      "technician-uuid-1",
    );
    expect(createNotificationService.execute).not.toHaveBeenCalled();
  });
});
