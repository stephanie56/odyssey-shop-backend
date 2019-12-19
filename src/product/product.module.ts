import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CustomProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CustomProductRepository])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
