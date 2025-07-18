import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LoginParams } from './dto/login_params.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const AUTHSECRETKEY = 'AUTHSECRETKEY';

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

    return {
      success: true,
      message: 'Login successfully',
      data: {
        token,
        refresh_token,
      },
    };
  }
}
