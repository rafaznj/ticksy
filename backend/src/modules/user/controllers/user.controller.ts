import { Body, Controller, Get, Inject, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { CreateUserDto } from "../dtos/create.dto";
import type { ICreateUserService } from "../services/contracts/create";
import type { IDeactivateUserService } from "../services/contracts/deactivate";
import type { IGetUserByIdService } from "../services/contracts/get-by-id";
import type { IUpdateUserService } from "../services/contracts/update";
import type { IGetUserByEmailService } from "../services/contracts/get-by-email";
import { UpdateUserDto } from "../dtos/update.dto";
import type { IGetUserPagedService } from "../services/contracts/get-paged";
import type { IQueryOptions } from "../../../shared/types/query-options";
import type { IGetAssignableUsersPagedService } from "../services/contracts/get-assignable-paged";
import type { IActivateUserService } from "../services/contracts/activate";

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
  ) {}

  @Post("")
  async create(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get("get-paged")
  async getPaged(@Query() query: IQueryOptions) {
    const result = await this.getUserPagedService.execute(query);
    return result;
  }

  @Get("/get-assignable")
  async getAssignable(@Query() query: IQueryOptions) {
    return this.getAssignableUsersPagedService.execute(query);
  }

  @Get("get-by-email/:email")
  async getByEmail(@Param("email") email: string) {
    return this.getUserByEmailService.execute(email);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getUserByIdService.execute(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    return this.updateUserService.execute(id, data);
  }

  @Patch(":id/deactivate")
  async deactivate(@Param("id") id: string) {
    return this.deactivateUserService.execute(id);
  }

  @Patch(":id/activate")
  async activate(@Param("id") id: string) {
    return this.activateUserService.execute(id);
  }
}
