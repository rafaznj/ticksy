import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import type { IAssignTicketService } from "../contracts/assign";
import type { IGetUnassignedTicketsRepository } from "../../repositories/contracts/get-unassigned-tickets";
import type { ICountInprogressTicketsByTechnicianRepository } from "../../repositories/contracts/count-in-progress-tickets-by-technician";
import type { IGetUserIdsByRoleService } from "../../../user/services/contracts/get-ids-by-role";
import { REPOSITORY_TOKENS } from "../../../../shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "../../../../shared/di/tokens.services";
import { UserRoleEnum } from "../../../user/enums/role.enum";
import { AutoAssignTicketService } from "../auto-assign-tickets.service";

type UnassignedTickets = Awaited<ReturnType<IGetUnassignedTicketsRepository["execute"]>>;

const makeTickets = (ids: string[]) => ids.map((id) => ({ id })) as unknown as UnassignedTickets;

const MAX = 5;

describe("AutoAssignTicketService", () => {
  let service: AutoAssignTicketService;
  let getUnassignedTicketsRepository: jest.Mocked<IGetUnassignedTicketsRepository>;
  let countInprogressTicketsByTechnicianRepository: jest.Mocked<ICountInprogressTicketsByTechnicianRepository>;
  let getUserIdsByRoleService: jest.Mocked<IGetUserIdsByRoleService>;
  let assignTicketService: jest.Mocked<IAssignTicketService>;

  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(async () => {
    getUnassignedTicketsRepository = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IGetUnassignedTicketsRepository>;

    countInprogressTicketsByTechnicianRepository = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ICountInprogressTicketsByTechnicianRepository>;

    getUserIdsByRoleService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IGetUserIdsByRoleService>;

    assignTicketService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IAssignTicketService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutoAssignTicketService,
        {
          provide: REPOSITORY_TOKENS.GetUnassignedTicketsRepository,
          useValue: getUnassignedTicketsRepository,
        },
        {
          provide: REPOSITORY_TOKENS.CountInprogressTicketsByTechnicianRepository,
          useValue: countInprogressTicketsByTechnicianRepository,
        },
        { provide: SERVICE_TOKENS.GetUserIdsByRoleService, useValue: getUserIdsByRoleService },
        { provide: SERVICE_TOKENS.AssignTicketService, useValue: assignTicketService },
      ],
    }).compile();

    service = module.get<AutoAssignTicketService>(AutoAssignTicketService);

    logSpy = jest.spyOn(Logger.prototype, "log").mockImplementation();
    warnSpy = jest.spyOn(Logger.prototype, "warn").mockImplementation();
    errorSpy = jest.spyOn(Logger.prototype, "error").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("early exits", () => {
    it("should warn and stop before fetching tickets when there are no technicians", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue([]);

      await service.execute();

      expect(getUserIdsByRoleService.execute).toHaveBeenCalledWith(
        UserRoleEnum.TECHNICAL_ASSISTANCE,
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(getUnassignedTicketsRepository.execute).not.toHaveBeenCalled();
      expect(countInprogressTicketsByTechnicianRepository.execute).not.toHaveBeenCalled();
      expect(assignTicketService.execute).not.toHaveBeenCalled();
    });

    it("should log and stop before counting tickets when there are no unassigned tickets", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets([]));

      await service.execute();

      expect(logSpy).toHaveBeenCalledWith("No unassigned tickets pending.");
      expect(countInprogressTicketsByTechnicianRepository.execute).not.toHaveBeenCalled();
      expect(assignTicketService.execute).not.toHaveBeenCalled();
    });

    it("should log and not assign anything when every technician is at maximum capacity", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1", "tech-2"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: MAX },
        { technicianId: "tech-2", count: MAX + 1 },
      ]);

      await service.execute();

      expect(logSpy).toHaveBeenCalledWith(
        `All technicians have reached the maximum capacity of ${MAX} active tickets.`,
      );
      expect(assignTicketService.execute).not.toHaveBeenCalled();
    });
  });

  describe("distribution", () => {
    it("should pass the technician ids to the count repository", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1", "tech-2"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: 0 },
      ]);
      assignTicketService.execute.mockResolvedValue(true as never);

      await service.execute();

      expect(countInprogressTicketsByTechnicianRepository.execute).toHaveBeenCalledWith([
        "tech-1",
        "tech-2",
      ]);
    });

    it("should assign the ticket to the technician with the fewest in-progress tickets", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1", "tech-2"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: 3 },
        { technicianId: "tech-2", count: 1 },
      ]);
      assignTicketService.execute.mockResolvedValue(true as never);

      await service.execute();

      expect(assignTicketService.execute).toHaveBeenCalledTimes(1);
      expect(assignTicketService.execute).toHaveBeenCalledWith("t1", "tech-2");
    });

    it("should keep assigning to the least loaded technician as counts change", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1", "tech-2"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1", "t2"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: 2 },
        { technicianId: "tech-2", count: 0 },
      ]);
      assignTicketService.execute.mockResolvedValue(true as never);

      await service.execute();

      expect(assignTicketService.execute).toHaveBeenNthCalledWith(1, "t1", "tech-2");
      expect(assignTicketService.execute).toHaveBeenNthCalledWith(2, "t2", "tech-2");
    });

    it("should ignore technicians at capacity and include the ones just below it", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1", "tech-2"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: MAX },
        { technicianId: "tech-2", count: MAX - 1 },
      ]);
      assignTicketService.execute.mockResolvedValue(true as never);

      await service.execute();

      expect(assignTicketService.execute).toHaveBeenCalledTimes(1);
      expect(assignTicketService.execute).toHaveBeenCalledWith("t1", "tech-2");
    });

    it("should stop and log when the only technician reaches maximum capacity during distribution", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1", "t2", "t3"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: MAX - 1 },
      ]);
      assignTicketService.execute.mockResolvedValue(true as never);

      await service.execute();

      expect(assignTicketService.execute).toHaveBeenCalledTimes(1);
      expect(assignTicketService.execute).toHaveBeenCalledWith("t1", "tech-1");
      expect(logSpy).toHaveBeenCalledWith("All technicians have reached their maximum capacity.");
    });

    it("should not increment the technician count when the assignment returns falsy", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1", "t2"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: MAX - 1 },
      ]);
      assignTicketService.execute
        .mockResolvedValueOnce(false as never)
        .mockResolvedValueOnce(true as never);

      await service.execute();

      expect(assignTicketService.execute).toHaveBeenCalledTimes(2);
      expect(assignTicketService.execute).toHaveBeenNthCalledWith(1, "t1", "tech-1");
      expect(assignTicketService.execute).toHaveBeenNthCalledWith(2, "t2", "tech-1");
    });
  });

  describe("error handling", () => {
    it("should log the stack and continue with the next ticket when an assignment throws an Error", async () => {
      const error = new Error("db down");
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1", "t2"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: 0 },
      ]);
      assignTicketService.execute.mockRejectedValueOnce(error).mockResolvedValueOnce(true as never);

      await expect(service.execute()).resolves.toBeUndefined();

      expect(errorSpy).toHaveBeenCalledWith(
        "Failed to assign ticket t1 to technician tech-1",
        error.stack,
      );
      expect(assignTicketService.execute).toHaveBeenCalledTimes(2);
      expect(assignTicketService.execute).toHaveBeenNthCalledWith(2, "t2", "tech-1");
      expect(logSpy).toHaveBeenCalledWith("Automatic ticket distribution completed.");
    });

    it("should log the stringified value when an assignment throws something that is not an Error", async () => {
      getUserIdsByRoleService.execute.mockResolvedValue(["tech-1"]);
      getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1"]));
      countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
        { technicianId: "tech-1", count: 0 },
      ]);
      assignTicketService.execute.mockRejectedValueOnce("string failure");

      await service.execute();

      expect(errorSpy).toHaveBeenCalledWith(
        "Failed to assign ticket t1 to technician tech-1",
        "string failure",
      );
    });
  });

  it("should log the completion message after distributing the tickets", async () => {
    getUserIdsByRoleService.execute.mockResolvedValue(["tech-1"]);
    getUnassignedTicketsRepository.execute.mockResolvedValue(makeTickets(["t1"]));
    countInprogressTicketsByTechnicianRepository.execute.mockResolvedValue([
      { technicianId: "tech-1", count: 0 },
    ]);
    assignTicketService.execute.mockResolvedValue(true as never);

    await service.execute();

    expect(logSpy).toHaveBeenCalledWith(
      "Starting distribution of 1 tickets among 1 technicians with available capacity.",
    );
    expect(logSpy).toHaveBeenLastCalledWith("Automatic ticket distribution completed.");
  });
});
