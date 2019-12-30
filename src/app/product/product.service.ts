import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductsByCategory(categoryId: string): Promise<Product[]> {
    return await this.productRepository.find({ categoryId });
  }

  async findProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async createProduct(createProductDto: Product): Promise<Product> {
    const {
      categoryId,
      count,
      description,
      imgUrl,
      origin,
      price,
      title,
    } = createProductDto;
    const newProduct = this.productRepository.create();
    return await this.productRepository.save({
      ...newProduct,
      categoryId,
      count,
      description,
      imgUrl,
      origin,
      price,
      title,
    });
  }
}
