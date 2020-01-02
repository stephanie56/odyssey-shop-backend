import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findCategoryById(id: string): Promise<Category> {
    return await this.categoryRepository.findOne(id);
  }

  async createCategory(createCategoryDto: Category): Promise<Category> {
    const name = createCategoryDto.name;
    const newCategory = await this.categoryRepository.create();
    return await this.categoryRepository.save({
      ...newCategory,
      name,
    });
  }
}
