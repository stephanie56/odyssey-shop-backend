import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';

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
  async create(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<Category> {
    const { id } = params;
    return this.categoryService.removeCategoryById(id);
  }
}
