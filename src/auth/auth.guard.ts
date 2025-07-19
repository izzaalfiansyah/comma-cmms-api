import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { AUTHSECRETKEY } from './auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('USER_PROVIDER') private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest<Request>();

      const token = req.headers['authorization']?.replace('Bearer ', '');
      const payload: any = verify(token as string, AUTHSECRETKEY);

      const user = await this.userRepository.findOneBy({ id: payload.id });

      if (!user) {
        throw new Error('no user found');
      }

      (req as any).user = user;

      return true;
    } catch (e: any) {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
