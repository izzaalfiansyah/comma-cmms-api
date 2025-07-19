import { Asset } from 'src/entity/asset.entity';
import { DataSource } from 'typeorm';

export const assetProvider = [
  {
    provide: 'ASSET_PROVIDER',
    inject: ['DATA_SOURCE'],
    useFactory: (data_source: DataSource) => data_source.getRepository(Asset),
  },
];
