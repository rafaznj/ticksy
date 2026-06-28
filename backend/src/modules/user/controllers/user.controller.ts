import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import { CreateUserDto } from "../dto/create-user.dm";
import { CreateUserService } from "../services/create.service";

@Controller("user")
export class UserController {
  constructor(
    @Inject(SERVICE_TOKENS.CreateUserService)
    private readonly createUserService: CreateUserService,
  ) {}

  @Post("/")
  async create(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }
}
