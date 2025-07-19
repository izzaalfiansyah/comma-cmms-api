import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import 'dotenv/config';
import { AuthGuard } from './auth/auth.guard';

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log('Server running on port ' + port.toString());
  })
  .catch((e: any) => {
    console.error(e);
  });
