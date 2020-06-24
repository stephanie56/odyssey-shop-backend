import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findProductPriceById(id: string): Promise<number> {
    const product = await this.findProductById(id);
    return product.price;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    // Find and instantiate the selected category
    const { categoryId } = product;
    const selectedCategory = await this.categoryService.findCategoryById(
      categoryId,
    );
    const updatedProduct = {
      ...product,
      category: selectedCategory,
    };
    const newProduct = this.productRepository.create(updatedProduct);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(product: UpdateProductDto): Promise<Product> {
    const { id } = product;
    const { categoryId } = product;
    const productToUpdate = await this.findProductById(id);
    // return true when there is no category id, or the category id doesn't match with the product's category
    const isCategoryUpdated =
      !productToUpdate.category || productToUpdate.category?.id !== categoryId;
    const selectedCategory = isCategoryUpdated
      ? await this.categoryService.findCategoryById(categoryId)
      : productToUpdate.category;
    return await this.productRepository.save({
      ...productToUpdate,
      ...product,
      category: selectedCategory,
    });
  }

  async removeProductById(id: string): Promise<Product> {
    const productOrNull = await this.productRepository.findOne({ id });
    return await this.productRepository.remove(productOrNull);
  }
}
