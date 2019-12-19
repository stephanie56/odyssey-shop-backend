import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomProductRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(CustomProductRepository)
    private readonly productRepository: CustomProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }
}
