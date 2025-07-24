import {
  HttpException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AUTHSECRETKEY } from 'src/auth/auth.service';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_PROVIDER') private readonly userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const app_key = process.env.APP_KEY;
    const request_app_key = req.headers['x-app-key'];

    if (app_key != request_app_key) {
      throw new HttpException('app key invalid', 403);
    }

    let user: User | null = null;

    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      const payload: any = verify(token as string, AUTHSECRETKEY);

      user = await this.userRepository.findOneBy({ id: payload.id });
    } catch (e: any) {
      user = null;
    }

    (req as any).user = user;

    next();
  }
}
