import { Global, Module } from '@nestjs/common';
import { databaseProvider } from 'src/data-source/data-source';
import { userProvider } from 'src/user/user';

@Global()
@Module({
  providers: [...databaseProvider, ...userProvider],
  exports: [...databaseProvider, ...userProvider],
})
export class CommonModule {}
