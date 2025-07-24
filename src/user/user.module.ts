import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { roleProvider } from 'src/role/role';

@Module({
  controllers: [UserController],
  providers: [UserService, ...roleProvider],
})
export class UserModule {}
