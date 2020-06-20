import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/createProduct.dto';

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
    return await this.productRepository.findOne({ id });
  }

  async findProductPriceById(id: string): Promise<number> {
    const product = await this.productRepository.findOne({ id });
    return product.price;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(product: Product): Promise<Product> {
    const id = product.id;
    const productToUpdate = await this.productRepository.findOne({ id });
    return await this.productRepository.save({
      ...productToUpdate,
      ...product,
    });
  }

  async removeProductById(id: string): Promise<Product> {
    const productOrNull = await this.productRepository.findOne({ id });
    return await this.productRepository.remove(productOrNull);
  }
}
