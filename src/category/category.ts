import { Category } from 'src/entity/category.entity';
import { DataSource } from 'typeorm';

export const categoryProvider = [
  {
    provide: 'CATEGORY_PROVIDER',
    inject: ['DATA_SOURCE'],
    useFactory: (data_source: DataSource) =>
      data_source.getRepository(Category),
  },
];
