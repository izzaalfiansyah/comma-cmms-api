import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryProvider } from './category';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryService, ...categoryProvider],
  controllers: [CategoryController],
})
export class CategoryModule {}
