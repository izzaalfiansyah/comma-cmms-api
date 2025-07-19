import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { roleProvider } from './role/role';

@Module({
  imports: [AuthModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, ...roleProvider],
})
export class AppModule {}
