import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginParams } from './dto/login_params.dto';
import { RefreshTokenParams } from './dto/refresh_token_params.dto';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authProvider: AuthService) {}

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
