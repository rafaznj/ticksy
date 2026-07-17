import { Body, Controller, Get, Inject, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { CreateUserDto } from "../dto/create.dto";
import type { ICreateUserService } from "../services/contracts/create";
import type { IDeactivateUserService } from "../services/contracts/deactivate";
import type { IGetUserByIdService } from "../services/contracts/get-by-id";
import type { IUpdateUserService } from "../services/contracts/update";
import type { IGetUserByEmailService } from "../services/contracts/get-by-email";
import { UpdateUserDto } from "../dto/update.dto";
import type { IGetUserPagedService } from "../services/contracts/get-paged";

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
    @Inject(SERVICE_TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmailService,
    @Inject(SERVICE_TOKENS.GetUserPagedService)
    private readonly getUserPagedService: IGetUserPagedService,
  ) {}

  @Post("")
  async create(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.getUserByIdService.execute(id);
  }

  @Get("get-by-email/:email")
  async getByEmail(@Param("email") email: string) {
    return this.getUserByEmailService.execute(email);
  }

  @Get("/paged/")
  async getPaged(
    @Query("currentPage") currentPage: number,
    @Query("pageSize") pageSize: number,
    @Query("sort") sort?: string,
    @Query("order") order?: string,
    @Query("search") search?: string,
  ) {
    const result = await this.getUserPagedService.execute({
      currentPage,
      pageSize,
      sort,
      order,
      search,
    });

    return result;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    return this.updateUserService.execute(id, data);
  }

  @Patch(":id")
  async deactivate(@Param("id") id: string) {
    return this.deactivateUserService.execute(id);
  }
}
