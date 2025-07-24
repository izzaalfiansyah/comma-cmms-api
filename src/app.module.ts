import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { roleProvider } from './role/role';
import { AppMiddleware } from './app/app.middleware';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    LocationModule,
    UserModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...roleProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
