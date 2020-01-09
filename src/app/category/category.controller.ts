import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('/api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findCategoryById(@Param() params): Promise<Category> {
    const { id } = params;
    const categoryOrNull = await this.categoryService.findCategoryById(id);
    if (!categoryOrNull) {
      throw new NotFoundException(`Cannot find category #${id}`);
    } else {
      return categoryOrNull;
    }
  }

  @Post()
  async create(@Body() createCategoryDto: Category): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
