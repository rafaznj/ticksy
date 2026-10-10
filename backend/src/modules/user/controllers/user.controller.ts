import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { CreateUserDto } from "../dtos/create.dto";
import type { ICreateUserService } from "../services/contracts/create";
import type { IDeactivateUserService } from "../services/contracts/deactivate";
import type { IGetUserByIdService } from "../services/contracts/get-by-id";
import type { IUpdateUserService } from "../services/contracts/update";
import type { IGetUserByEmailService } from "../services/contracts/get-by-email";
import { UpdateUserDto } from "../dtos/update.dto";
import type { IGetUserPagedService } from "../services/contracts/get-paged";
import type { IQueryOptions } from "../../../shared/interfaces/query-options";
import type { IGetAssignableUsersPagedService } from "../services/contracts/get-assignable-paged";
import type { IActivateUserService } from "../services/contracts/activate";
import type { IUserQueryOptions } from "../data/query-options.data";
import type { IInviteUserService } from "../services/contracts/invite";
import type { CreateUserData } from "../data/create.data";
import { ConfirmPasswordDto } from "../dtos/confirm-password.dto";
import type { IConfirmPasswordService } from "../services/contracts/confirm-password";
import { customResponse } from "../../../shared/utils/custom-response";

@Controller("user")
export class UserController {
  constructor(
    @Inject(SERVICE_TOKENS.CreateUserService)
    private readonly createUserService: ICreateUserService,
    @Inject(SERVICE_TOKENS.GetUserByIdService)
    private readonly getUserByIdService: IGetUserByIdService,
    @Inject(SERVICE_TOKENS.UpdateUserService)
    private readonly updateUserService: IUpdateUserService,
    @Inject(SERVICE_TOKENS.DeactivateUserService)
    private readonly deactivateUserService: IDeactivateUserService,
    @Inject(SERVICE_TOKENS.ActivateUserService)
    private readonly activateUserService: IActivateUserService,
    @Inject(SERVICE_TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmailService,
    @Inject(SERVICE_TOKENS.GetUserPagedService)
    private readonly getUserPagedService: IGetUserPagedService,
    @Inject(SERVICE_TOKENS.GetAssignableUsersPagedService)
    private readonly getAssignableUsersPagedService: IGetAssignableUsersPagedService,
    @Inject(SERVICE_TOKENS.InviteUserService)
    private readonly inviteUserService: IInviteUserService,
    @Inject(SERVICE_TOKENS.ConfirmPasswordService)
    private readonly confirmPasswordService: IConfirmPasswordService,
  ) {}

  @Post("/create")
  async create(@Body() data: CreateUserDto) {
    const response = await this.createUserService.execute(data);
    return customResponse(response);
  }

  @Get("get-paged")
  async getPaged(@Query() query: IUserQueryOptions) {
    const response = await this.getUserPagedService.execute(query);
    return customResponse(response);
  }

  @Get("/get-assignable")
  async getAssignable(@Query() query: IQueryOptions) {
    const response = await this.getAssignableUsersPagedService.execute(query);
    return customResponse(response);
  }

  @Get("/get-by-email/:email")
  async getByEmail(@Param("email") email: string) {
    const response = await this.getUserByEmailService.execute(email);
    return customResponse(response);
  }

  @Get("/get-by-id/:id")
  async getById(@Param("id") id: string) {
    const response = await this.getUserByIdService.execute(id);
    return customResponse(response);
  }

  @Put("/update/:id")
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    const response = await this.updateUserService.execute(id, data);
    return customResponse(response);
  }

  @Patch("/deactivate/:id")
  async deactivate(@Param("id") id: string) {
    const response = await this.deactivateUserService.execute(id);
    return customResponse(response);
  }

  @Patch("/activate/:id")
  async activate(@Param("id") id: string) {
    const response = await this.activateUserService.execute(id);
    return customResponse<boolean>(response);
  }

  @Post("/invite")
  async invite(@Body() data: CreateUserData) {
    const response = await this.inviteUserService.execute(data);
    return customResponse<void>(response);
  }

  @Patch("/confirm-password")
  @UseGuards(AuthGuard("jwt"))
  async confirmPassword(
    @Req() req: Request & { user: { id: string } },
    @Body() data: ConfirmPasswordDto,
  ) {
    const response = await this.confirmPasswordService.execute(req.user.id, data.password);
    return customResponse(response);
  }
}
