import { Location } from 'src/entity/location.entity';
import { DataSource } from 'typeorm';

export const locationProvider = [
  {
    provide: 'LOCATION_PROVIDER',
    inject: 'DATA_SOURCE',
    useFactory: (data_source: DataSource) =>
      data_source.getTreeRepository(Location),
  },
];
