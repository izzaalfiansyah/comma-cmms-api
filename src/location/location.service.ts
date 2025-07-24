import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Location } from 'src/entity/location.entity';
import { TreeRepository } from 'typeorm';
import { StoreLocationParams } from './dto/store-location-params.dto';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LOCATION_PROVIDER')
    private readonly locationRepository: TreeRepository<Location>,
  ) {}

  async findAll(query: Record<any, any>) {
    let locations: Array<Location> = [];

    // if (query.id) {
    //   const location = await this.locationRepository.findOne({
    //     where: { id: query.id },
    //     relations: {
    //       children: true,
    //     },
    //   });

    //   if (!location) {
    //     throw new HttpException('location not found', 400);
    //   }

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

  async store(params: StoreLocationParams) {
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
  async update(id: number, params: StoreLocationParams) {
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

  async destroy(id: number) {
    await this.locationRepository.delete(id);

    return {
      success: true,
      message: 'Location successfully deleted',
    };
  }
}
