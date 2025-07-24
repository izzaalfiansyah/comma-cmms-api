import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { StoreCategoryParams } from './dto/store-category-params.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_PROVIDER')
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoryRepository.find();

    return {
      success: true,
      message: 'Categories successfully retrieved',
      data: {
        categories,
      },
    };
  }

  async store(params: StoreCategoryParams) {
    await this.categoryRepository.save({
      name: params.name,
    });

    return {
      success: true,
      message: 'Category successfully created',
    };
  }

  async update(id: number, params: StoreCategoryParams) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new HttpException('category not found', 400);
    }

    category.name = params.name;

    await this.categoryRepository.save(category);

    return {
      success: true,
      message: 'Category successfully updated',
    };
  }

  async destroy(id: number) {
    await this.categoryRepository.delete(id);

    return {
      success: true,
      message: 'Category successfully deleted',
    };
  }
}
