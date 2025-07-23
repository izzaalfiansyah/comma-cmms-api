import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonFilter } from 'src/dto/common-filter.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() params: CommonFilter) {
    return this.userService.findAll(params);
  }
}
