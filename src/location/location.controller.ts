import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StoreLocationParams } from './dto/store-location-params.dto';
import { RoleGuard, Roles } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { LocationService } from './location.service';

@Controller('location')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  get(@Query() query: Record<string, any>) {
    return this.locationService.findAll(query);
  }

  @Post()
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  store(@Body() params: StoreLocationParams) {
    return this.locationService.store(params);
  }

  @Put(':id')
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  update(@Body() params: StoreLocationParams, @Param() id: number) {
    return this.locationService.update(id, params);
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  destroy(@Param() id: number) {
    return this.locationService.destroy(id);
  }
}
