import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { locationProvider } from './location';

@Module({
  providers: [...locationProvider],
  controllers: [LocationController],
})
export class LocationModule {}
