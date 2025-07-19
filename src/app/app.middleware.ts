import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const app_key = process.env.APP_KEY;
    const request_app_key = req.headers['x-app-key'];

    if (app_key != request_app_key) {
      throw new HttpException('app key invalid', 403);
    }
    next();
  }
}
