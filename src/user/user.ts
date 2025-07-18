import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';

export const userProvider = [
  {
    provide: 'USER_PROVIDER',
    useFactory: (data_source: DataSource) => {
      return data_source.getRepository(User);
    },
    inject: ['DATA_SOURCE'],
  },
];
