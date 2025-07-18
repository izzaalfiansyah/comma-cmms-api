import { DataSource } from 'typeorm';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const data_source = new DataSource({
        host: process.env.DB_HOST || 'localhost',
        type: (process.env.DB_TYPE || 'mysql') as 'mysql',
        port: (process.env.DB_PORT || 3306) as number,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return await data_source.initialize();
    },
  },
];
