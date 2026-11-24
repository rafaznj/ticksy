import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { REPOSITORY_TOKENS } from "../../../../shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "../../../../shared/di/tokens.services";
import { AppException } from "../../../../shared/exceptions/app-exception";
import { NotificationTypeEnum } from "../../../notification/enums/notification-type.enum";
import { ICreateNotificationService } from "../../../notification/services/contracts/create";
import { UserRoleEnum } from "../../../user/enums/role.enum";
import { IGetUserIdsByRoleService } from "../../../user/services/contracts/get-ids-by-role";
import { TicketCategoryEnum } from "../../enums/ticket-category.enum";
import { TicketPriorityEnum } from "../../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../../enums/ticket-status.enum";
import { IResolvedTicketRepository } from "../../repositories/contracts/resolved";
import { TicketViewModel } from "../../view-models/ticket.vm";
import { IGetTicketByIdService } from "../contracts/get-by-id";
import { ResolvedTicketService } from "../resolved.service";

describe("ResolvedTicketService", () => {
  let service: ResolvedTicketService;
  let resolvedTicketRepository: jest.Mocked<IResolvedTicketRepository>;
  let getTicketByIdService: jest.Mocked<IGetTicketByIdService>;
  let createNotificationService: jest.Mocked<ICreateNotificationService>;
  let getUserIdsByRoleService: jest.Mocked<IGetUserIdsByRoleService>;

  const ticketId = "ticket-uuid-1";

  const ticketBefore: TicketViewModel = {
    id: ticketId,
    code: 101,
    title: "Printer doesn't turn on",
    description: "Printer is not responding when I press the power button.",
    category: TicketCategoryEnum.HARDWARE,
    priority: TicketPriorityEnum.HIGH,
    status: TicketStatusEnum.IN_PROGRESS,
    createdById: "user-creator-id",
    createdByName: "John Doe",
    assignedToId: "technician-uuid-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const ticketAfter: TicketViewModel = {
    ...ticketBefore,
    status: TicketStatusEnum.RESOLVED,
    assignedToName: "Ana Technician",
  };

  const catchError = async (): Promise<unknown> => {
    try {
      await service.execute(ticketId);
    } catch (error) {
      return error;
    }
    return undefined;
  };

  beforeEach(async () => {
    resolvedTicketRepository = {
      execute: jest.fn(),
    } as jest.Mocked<IResolvedTicketRepository>;

    getTicketByIdService = {
      execute: jest.fn(),
    } as jest.Mocked<IGetTicketByIdService>;

    createNotificationService = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as jest.Mocked<ICreateNotificationService>;

    getUserIdsByRoleService = {
      execute: jest.fn().mockResolvedValue(["admin-1", "admin-2"]),
    } as jest.Mocked<IGetUserIdsByRoleService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResolvedTicketService,
        {
          provide: REPOSITORY_TOKENS.ResolvedTicketRepository,
          useValue: resolvedTicketRepository,
        },
        {
          provide: SERVICE_TOKENS.GetTicketByIdService,
          useValue: getTicketByIdService,
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

    service = module.get<ResolvedTicketService>(ResolvedTicketService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("execute", () => {
    describe("when the ticket is resolved successfully", () => {
      beforeEach(() => {
        getTicketByIdService.execute.mockResolvedValue(ticketBefore);
        resolvedTicketRepository.execute.mockResolvedValue(ticketAfter);
      });

      it("should return the ticket updated by the repository", async () => {
        const result = await service.execute(ticketId);

        expect(result).toEqual(ticketAfter);
      });

      it("should look up the ticket and then resolve it by id", async () => {
        await service.execute(ticketId);

        expect(getTicketByIdService.execute).toHaveBeenCalledWith(ticketId);
        expect(resolvedTicketRepository.execute).toHaveBeenCalledWith(ticketId);
      });

      it("should look up the users with the admin role", async () => {
        await service.execute(ticketId);

        expect(getUserIdsByRoleService.execute).toHaveBeenCalledWith(UserRoleEnum.ADMIN);
      });

      it("should notify the assigned technician first and then the admins", async () => {
        await service.execute(ticketId);

        expect(createNotificationService.execute).toHaveBeenCalledWith({
          type: NotificationTypeEnum.TICKET_STATUS_CHANGED,
          ticketId: ticketAfter.id,
          parameters: {
            userName: ticketAfter.assignedToName,
            title: ticketAfter.title,
            status: ticketAfter.status,
          },
          userIds: ["technician-uuid-1", "admin-1", "admin-2"],
        });
      });

      it("should notify only the assigned technician when there are no admins", async () => {
        getUserIdsByRoleService.execute.mockResolvedValueOnce([]);

        await service.execute(ticketId);

        expect(createNotificationService.execute).toHaveBeenCalledWith(
          expect.objectContaining({ userIds: ["technician-uuid-1"] }),
        );
      });

      it("should resolve the ticket before looking up admins and notifying", async () => {
        await service.execute(ticketId);

        const [resolveOrder] = resolvedTicketRepository.execute.mock.invocationCallOrder;
        const [adminsOrder] = getUserIdsByRoleService.execute.mock.invocationCallOrder;
        const [notificationOrder] = createNotificationService.execute.mock.invocationCallOrder;

        expect(resolveOrder).toBeLessThan(adminsOrder);
        expect(adminsOrder).toBeLessThan(notificationOrder);
      });
    });

    describe("when the ticket cannot be resolved", () => {
      it("should throw a not found AppException and do nothing else when the ticket does not exist", async () => {
        getTicketByIdService.execute.mockResolvedValue(null);

        const error = await catchError();

        expect(error).toBeInstanceOf(AppException);
        expect((error as AppException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(resolvedTicketRepository.execute).not.toHaveBeenCalled();
        expect(getUserIdsByRoleService.execute).not.toHaveBeenCalled();
        expect(createNotificationService.execute).not.toHaveBeenCalled();
      });

      it("should throw a conflict AppException and do nothing else when the ticket is not assigned", async () => {
        getTicketByIdService.execute.mockResolvedValue({ ...ticketBefore, assignedToId: null });

        const error = await catchError();

        expect(error).toBeInstanceOf(AppException);
        expect((error as AppException).getStatus()).toBe(HttpStatus.CONFLICT);
        expect(resolvedTicketRepository.execute).not.toHaveBeenCalled();
        expect(getUserIdsByRoleService.execute).not.toHaveBeenCalled();
        expect(createNotificationService.execute).not.toHaveBeenCalled();
      });

      it("should throw a not found AppException and skip the notification when the repository returns nothing", async () => {
        getTicketByIdService.execute.mockResolvedValue(ticketBefore);
        resolvedTicketRepository.execute.mockResolvedValue(null);

        const error = await catchError();

        expect(error).toBeInstanceOf(AppException);
        expect((error as AppException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(getUserIdsByRoleService.execute).not.toHaveBeenCalled();
        expect(createNotificationService.execute).not.toHaveBeenCalled();
      });

      it("should throw a not found AppException and skip the notification when the resolved ticket has no assigned technician name", async () => {
        getTicketByIdService.execute.mockResolvedValue(ticketBefore);
        resolvedTicketRepository.execute.mockResolvedValue({
          ...ticketAfter,
          assignedToName: undefined,
        });

        const error = await catchError();

        expect(error).toBeInstanceOf(AppException);
        expect((error as AppException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(getUserIdsByRoleService.execute).not.toHaveBeenCalled();
        expect(createNotificationService.execute).not.toHaveBeenCalled();
      });
    });

    describe("when a dependency fails", () => {
      beforeEach(() => {
        getTicketByIdService.execute.mockResolvedValue(ticketBefore);
        resolvedTicketRepository.execute.mockResolvedValue(ticketAfter);
      });

      it("should propagate the error and skip the notification when the admin lookup fails", async () => {
        getUserIdsByRoleService.execute.mockRejectedValueOnce(new Error("lookup failed"));

        await expect(service.execute(ticketId)).rejects.toThrow("lookup failed");

        expect(createNotificationService.execute).not.toHaveBeenCalled();
      });

      it("should reject even though the ticket was already resolved when the notification fails", async () => {
        createNotificationService.execute.mockRejectedValueOnce(new Error("notification failed"));

        await expect(service.execute(ticketId)).rejects.toThrow("notification failed");

        expect(resolvedTicketRepository.execute).toHaveBeenCalledWith(ticketId);
      });
    });
  });
});
