import { Test, TestingModule } from "@nestjs/testing";
import * as argon2 from "argon2";

import { IGetUserByIdService } from "../../../user/services/contracts/get-by-id";
import { IJwtTokenService } from "../contracts/jwt-token";
import { RefreshService } from "../refresh.service";
import { SERVICE_TOKENS } from "../../../../shared/di/tokens.services";
import { AppException } from "../../../../shared/exceptions/app-exception";
import { UserRoleEnum } from "../../../user/enums/role.enum";
import { UserViewModel } from "../../../user/view-models/user.vm";

jest.mock("argon2", () => ({
  verify: jest.fn(),
  hash: jest.fn(),
}));

describe("RefreshService", () => {
  let service: RefreshService;
  let jwtTokenService: jest.Mocked<IJwtTokenService>;
  let getUserByIdService: jest.Mocked<IGetUserByIdService>;

  const mockPayload = { sub: "user-id" };
  const mockStored = { id: "token-id-1", tokenHash: "stored-hash" };
  const mockUser: UserViewModel = {
    id: "user-uuid-1",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "hashed-password",
    role: UserRoleEnum.EMPLOYEE,
    deleted: false,
    mustChangePassword: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    jwtTokenService = {
      signAccessToken: jest.fn(),
      signRefreshToken: jest.fn(),
      verifyRefreshToken: jest.fn(),
      create: jest.fn(),
      findActiveByUserId: jest.fn(),
      revoke: jest.fn(),
    } as unknown as jest.Mocked<IJwtTokenService>;

    getUserByIdService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IGetUserByIdService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshService,
        { provide: SERVICE_TOKENS.JwtTokenService, useValue: jwtTokenService },
        { provide: SERVICE_TOKENS.GetUserByIdService, useValue: getUserByIdService },
      ],
    }).compile();

    service = module.get<RefreshService>(RefreshService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("execute", () => {
    it("should successfully refresh tokens", async () => {
      jwtTokenService.verifyRefreshToken.mockReturnValue(mockPayload);
      jwtTokenService.findActiveByUserId.mockResolvedValue(mockStored);
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      getUserByIdService.execute.mockResolvedValue(mockUser);
      jwtTokenService.signAccessToken.mockReturnValue("new-access-token");
      jwtTokenService.signRefreshToken.mockReturnValue("new-refresh-token");
      (argon2.hash as jest.Mock).mockResolvedValue("new-refresh-hash");
      jwtTokenService.create.mockResolvedValue();

      const result = await service.execute("refresh-token");

      expect(result).toEqual({
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
      });
      expect(jwtTokenService.verifyRefreshToken).toHaveBeenCalledWith("refresh-token");
      expect(jwtTokenService.findActiveByUserId).toHaveBeenCalledWith("user-id");
      expect(argon2.verify).toHaveBeenCalledWith("stored-hash", "refresh-token");
      expect(getUserByIdService.execute).toHaveBeenCalledWith("user-id");
      expect(jwtTokenService.revoke).toHaveBeenCalledWith(mockUser.id);
      expect(jwtTokenService.signAccessToken).toHaveBeenCalledWith(mockUser.id, mockUser.email);
      expect(jwtTokenService.signRefreshToken).toHaveBeenCalledWith(mockUser.id);
      expect(argon2.hash).toHaveBeenCalledWith("new-refresh-token");
      expect(jwtTokenService.create).toHaveBeenCalledWith(mockUser.id, "new-refresh-hash");

      expect(jwtTokenService.revoke.mock.invocationCallOrder[0]).toBeLessThan(
        jwtTokenService.create.mock.invocationCallOrder[0],
      );
    });

    it("should propagate the error when the refresh token is invalid", async () => {
      jwtTokenService.verifyRefreshToken.mockImplementation(() => {
        throw new Error("invalid token");
      });

      await expect(service.execute("bad-token")).rejects.toThrow("invalid token");

      expect(jwtTokenService.findActiveByUserId).not.toHaveBeenCalled();
      expect(jwtTokenService.revoke).not.toHaveBeenCalled();
    });

    it("should throw unauthorized when there is no active stored token", async () => {
      jwtTokenService.verifyRefreshToken.mockReturnValue(mockPayload);
      jwtTokenService.findActiveByUserId.mockResolvedValue(null);

      await expect(service.execute("refresh-token")).rejects.toThrow(AppException);

      expect(argon2.verify).not.toHaveBeenCalled();
      expect(getUserByIdService.execute).not.toHaveBeenCalled();
      expect(jwtTokenService.revoke).not.toHaveBeenCalled();
    });

    it("should throw unauthorized when the token hash does not match", async () => {
      jwtTokenService.verifyRefreshToken.mockReturnValue(mockPayload);
      jwtTokenService.findActiveByUserId.mockResolvedValue(mockStored);
      (argon2.verify as jest.Mock).mockResolvedValue(false);

      await expect(service.execute("refresh-token")).rejects.toThrow(AppException);

      expect(getUserByIdService.execute).not.toHaveBeenCalled();
      expect(jwtTokenService.revoke).not.toHaveBeenCalled();
      expect(jwtTokenService.create).not.toHaveBeenCalled();
    });

    it("should throw unauthorized when the user is not found", async () => {
      jwtTokenService.verifyRefreshToken.mockReturnValue(mockPayload);
      jwtTokenService.findActiveByUserId.mockResolvedValue(mockStored);
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      getUserByIdService.execute.mockResolvedValue(null);

      await expect(service.execute("refresh-token")).rejects.toThrow(AppException);

      expect(jwtTokenService.revoke).not.toHaveBeenCalled();
      expect(jwtTokenService.signAccessToken).not.toHaveBeenCalled();
      expect(jwtTokenService.create).not.toHaveBeenCalled();
    });
  });
});
