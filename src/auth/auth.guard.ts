import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('USER_PROVIDER') private readonly userRepository: Repository<User>,
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<any>();

    if (!req.user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
