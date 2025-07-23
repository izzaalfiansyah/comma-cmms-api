import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Request } from 'express';
import { AUTHSECRETKEY } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_PROVIDER') private readonly userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: any, next: () => void) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      const payload: any = verify(token as string, AUTHSECRETKEY);

      const user = await this.userRepository.findOneBy({ id: payload.id });

      if (!user) {
        throw new Error('user not found');
      }

      (req as any).user = user;
    } catch (e: any) {
      // do nothing
    }

    next();
  }
}
