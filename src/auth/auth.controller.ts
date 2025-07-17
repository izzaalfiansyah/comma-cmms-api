import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from './auth';
import { LoginParams } from './dto/login_params.dto';

@Controller()
export class AuthController {
  constructor(private readonly authProvider: Auth) {}

  @Post('/login')
  login(@Body() params: LoginParams) {
    this.authProvider.login(params);
  }
}
