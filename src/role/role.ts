import { Role } from 'src/entity/role.entity';
import { DataSource } from 'typeorm';

export const roleProvider = [
  {
    provide: 'ROLE_PROVIDER',
    inject: ['DATA_SOURCE'],
    useFactory: (data_source: DataSource) => data_source.getRepository(Role),
  },
];
