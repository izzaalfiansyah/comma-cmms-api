import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppGuard } from './app/app.guard';

import 'dotenv/config';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AppGuard());

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log('Server running on port ' + port.toString());
  })
  .catch((e: any) => {
    console.error(e);
  });
