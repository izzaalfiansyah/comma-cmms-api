import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Auth } from './auth';
import { LoginParams } from './dto/login_params.dto';
import { RefreshTokenParams } from './dto/refresh_token_params.dto';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authProvider: Auth) {}

  @Post('/login')
  login(@Body() params: LoginParams) {
    return this.authProvider.login(params);
  }

  @Post('/refresh-token')
  refreshToken(@Body() params: RefreshTokenParams) {
    return this.authProvider.refreshToken(params);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  profile(@Req() req: Request) {
    return this.authProvider.profile(req);
  }
}
