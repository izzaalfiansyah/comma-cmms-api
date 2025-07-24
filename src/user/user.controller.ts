import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonFilter } from 'src/dto/common-filter.dto';
import { CreateUserParams } from './dto/create-user-params.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() params: CommonFilter) {
    return this.userService.findAll(params);
  }

  @Post()
  store(@Body() params: CreateUserParams) {
    return this.userService.store(params);
  }
}
