import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { locationProvider } from './location';
import { LocationService } from './location.service';

@Module({
  providers: [...locationProvider, LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
