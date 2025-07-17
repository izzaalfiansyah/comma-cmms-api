import { Injectable } from '@nestjs/common';
import { LoginParams } from './dto/login_params.dto';

@Injectable()
export class Auth {
  login(params: LoginParams) {
    console.log(params);

    return {
      success: true,
      message: 'Login successfully',
    };
  }
}
