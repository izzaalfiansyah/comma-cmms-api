import { Global, Module } from '@nestjs/common';
import { databaseProvider } from 'src/data-source/data-source';
import { userProvider } from 'src/user/user';

const providers = [...databaseProvider, ...userProvider];

@Global()
@Module({
  providers,
  exports: providers,
})
export class CommonModule {}
