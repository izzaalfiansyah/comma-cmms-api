import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LoginParams } from './dto/login_params.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { RefreshTokenParams } from './dto/refresh_token_params.dto';
import { Request } from 'express';

export const AUTHSECRETKEY = 'AUTHSECRETKEY';

@Injectable()
export class Auth {
  constructor(
    @Inject('USER_PROVIDER') private userRepository: Repository<User>,
  ) {}

  async login(params: LoginParams) {
    const user = await this.userRepository.findOneBy({ email: params.email });

    if (!user) {
      throw new HttpException('user not found', 404);
    }

    const isValid = await compare(params.password, user.password);

    if (!isValid) {
      throw new HttpException('wrong password', 401);
    }

    const token = sign({ id: user.id }, AUTHSECRETKEY, {
      expiresIn: '1 days',
    });

    const refresh_token = sign({ id: user.id }, AUTHSECRETKEY, {
      expiresIn: '30 days',
    });

    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Login successfully',
      data: {
        token,
        refresh_token,
      },
    };
  }

  async refreshToken(params: RefreshTokenParams) {
    try {
      const payload: any = verify(params.refresh_token, AUTHSECRETKEY);

      const user = await this.userRepository.findOneOrFail({
        where: { id: payload.id },
      });

      if (!user) {
        throw new HttpException('token is not valid', 400);
      }

      const token = sign({ id: user.id }, AUTHSECRETKEY, {
        expiresIn: '1 days',
      });

      return {
        success: true,
        message: 'retrieve new token successfully',
        data: { token },
      };
    } catch (_: any) {
      throw new HttpException('token is expired', 400);
    }
  }

  profile(req: Request) {
    const user = (req as any).user;

    return {
      success: true,
      message: 'Profile successfully retrieved',
      data: user,
    };
  }
}
