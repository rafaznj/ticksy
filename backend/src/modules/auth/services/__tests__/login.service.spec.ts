import { Test, TestingModule } from "@nestjs/testing";
import * as argon2 from "argon2";
import { IGetUserByEmailService } from "../../../user/services/contracts/get-by-email";
import { IJwtTokenService } from "../contracts/jwt-token";
import { LoginService } from "../login.service";
import { SERVICE_TOKENS } from "../../../../shared/di/tokens.services";
import { UserViewModel } from "../../../user/view-models/user.vm";
import { UserRoleEnum } from "../../../user/enums/role.enum";
import { AppException } from "../../../../shared/exceptions/app-exception";

jest.mock("argon2", () => ({
  verify: jest.fn(),
  hash: jest.fn(),
}));

describe("LoginService", () => {
  let service: LoginService;
  let getUserByEmailService: jest.Mocked<IGetUserByEmailService>;
  let jwtTokenService: jest.Mocked<IJwtTokenService>;

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

    getUserByEmailService = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<IGetUserByEmailService>;

    jwtTokenService = {
      signAccessToken: jest.fn(),
      signRefreshToken: jest.fn(),
      verifyRefreshToken: jest.fn(),
      create: jest.fn(),
      findActiveByUserId: jest.fn(),
      revoke: jest.fn(),
    } as unknown as jest.Mocked<IJwtTokenService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: SERVICE_TOKENS.GetUserByEmailService,
          useValue: getUserByEmailService,
        },
        {
          provide: SERVICE_TOKENS.JwtTokenService,
          useValue: jwtTokenService,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should successfully authenticate and return tokens with user data", async () => {
    getUserByEmailService.execute.mockResolvedValue(mockUser);
    (argon2.verify as jest.Mock).mockResolvedValue(true);
    (argon2.hash as jest.Mock).mockResolvedValue("argon-hashed-refresh-token");
    jwtTokenService.signAccessToken.mockReturnValue("access-token-jwt");
    jwtTokenService.signRefreshToken.mockReturnValue("refresh-token-jwt");
    jwtTokenService.create.mockResolvedValue();

    const result = await service.execute({
      email: "john.doe@example.com",
      password: "correct-password",
    });

    expect(result).toEqual({
      accessToken: "access-token-jwt",
      refreshToken: "refresh-token-jwt",
      user: mockUser,
    });

    expect(getUserByEmailService.execute).toHaveBeenCalledWith("john.doe@example.com");
    expect(argon2.verify).toHaveBeenCalledWith("hashed-password", "correct-password");
    expect(jwtTokenService.signAccessToken).toHaveBeenCalledWith(
      "user-uuid-1",
      "john.doe@example.com",
    );
    expect(jwtTokenService.signRefreshToken).toHaveBeenCalledWith("user-uuid-1");
    expect(jwtTokenService.create).toHaveBeenCalledWith(
      "user-uuid-1",
      "argon-hashed-refresh-token",
    );
  });

  it("should throw unauthorized AppException when user is not found", async () => {
    getUserByEmailService.execute.mockResolvedValue(null);

    await expect(
      service.execute({ email: "notfound@example.com", password: "password" }),
    ).rejects.toThrow(AppException);

    expect(argon2.verify).not.toHaveBeenCalled();
    expect(jwtTokenService.signAccessToken).not.toHaveBeenCalled();
    expect(jwtTokenService.create).not.toHaveBeenCalled();
  });

  it("should throw unauthorized AppException when password does not match", async () => {
    getUserByEmailService.execute.mockResolvedValue(mockUser);
    (argon2.verify as jest.Mock).mockResolvedValue(false);

    await expect(
      service.execute({ email: "john.doe@example.com", password: "wrong-password" }),
    ).rejects.toThrow(AppException);

    expect(argon2.verify).toHaveBeenCalledWith("hashed-password", "wrong-password");
    expect(jwtTokenService.signAccessToken).not.toHaveBeenCalled();
    expect(jwtTokenService.create).not.toHaveBeenCalled();
  });
});
