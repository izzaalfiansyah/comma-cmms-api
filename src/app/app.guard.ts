import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const app_key = process.env.APP_KEY;
    const request_app_key = req.headers['x-app-key'];

    if (app_key != request_app_key) {
      throw new HttpException('app key invalid', 403);
    }

    return true;
  }
}
