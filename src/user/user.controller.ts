import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserParams } from './dto/users-params.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() params: UserParams) {
    return this.userService.findAll(params);
  }
}
