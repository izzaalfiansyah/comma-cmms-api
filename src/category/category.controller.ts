import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { StoreCategoryParams } from './dto/store-category-params.dto';
import { RoleGuard, Roles } from 'src/role/role.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Roles(['admin'])
  @UseGuards(RoleGuard)
  @Post()
  store(@Body() params: StoreCategoryParams) {
    return this.categoryService.store(params);
  }

  @Roles(['admin'])
  @UseGuards(RoleGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() params: StoreCategoryParams) {
    return this.categoryService.update(id, params);
  }

  @Roles(['admin'])
  @UseGuards(RoleGuard)
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.categoryService.destroy(id);
  }
}
