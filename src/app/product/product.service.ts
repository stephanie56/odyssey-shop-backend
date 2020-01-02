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

  async findProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async createProduct(createProductDto: Product): Promise<Product> {
    const {
      count,
      description,
      imgUrl,
      origin,
      price,
      title,
    } = createProductDto;
    const newProduct = await this.productRepository.create();
    return await this.productRepository.save({
      ...newProduct,
      count,
      description,
      imgUrl,
      origin,
      price,
      title,
    });
  }
}
