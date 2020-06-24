import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['products'] });
  }

  // TODO: throw exception when the category is not found
  async findCategoryById(id: string): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async removeCategoryById(id: string): Promise<Category> {
    const categoryOrNull = await this.categoryRepository.findOne({ id });
    return await this.categoryRepository.remove(categoryOrNull);
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const { name } = category;
    const newCategory = await this.categoryRepository.create();
    return await this.categoryRepository.save({
      ...newCategory,
      name,
    });
  }
}
