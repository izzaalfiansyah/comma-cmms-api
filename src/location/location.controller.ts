import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Location } from 'src/entity/location.entity';
import { TreeRepository } from 'typeorm';
import { StoreLocationParams } from './dto/store-location-params.dto';
import { RoleGuard, Roles } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('location')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(
    @Inject('LOCATION_PROVIDER')
    private readonly locationRepository: TreeRepository<Location>,
  ) {}

  @Get()
  async get(@Query() query: Record<string, any>) {
    let locations: Array<Location> = [];

    // if (query.id) {
    //   const location = await this.locationRepository.findOne({
    //     where: { id: query.id },
    //     relations: {
    //       children: true,
    //     },
    //   });
    //
    //   if (!location) {
    //     throw new HttpException('location not found', 400);
    //   }
    //
    //   locations = location.children;
    // } else {
    //   locations = await this.locationRepository.findRoots();
    // }

    locations = await this.locationRepository.findTrees();

    return {
      success: true,
      message: 'Location successfully retrieved',
      data: locations,
    };
  }

  @Post()
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  async store(@Body() params: StoreLocationParams) {
    let parent: Location | undefined = undefined;

    if (params.parentId) {
      parent =
        (await this.locationRepository.findOneBy({
          id: params.parentId,
        })) || undefined;
    }

    await this.locationRepository.save({
      name: params.name,
      parent: parent,
    });

    return {
      success: true,
      message: 'Location successfully created',
    };
  }

  @Put(':id')
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  async update(@Body() params: StoreLocationParams, @Param() id: number) {
    const location = await this.locationRepository.findOneBy({ id: id });

    if (!location) {
      throw new HttpException('location not found', 400);
    }

    location.name = params.name;

    if (params.parentId) {
      location.parent =
        (await this.locationRepository.findOneBy({
          id: params.parentId,
        })) || undefined;
    }

    await this.locationRepository.save(location);

    return {
      success: true,
      message: 'Location successfully updated',
    };
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  async destroy(@Param() id: number) {
    await this.locationRepository.delete(id);

    return {
      success: true,
      message: 'Location successfully deleted',
    };
  }
}
