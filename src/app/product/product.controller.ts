import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Body,
  Post,
  Logger,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findProductById(@Param() params): Promise<Product> {
    const { id } = params;
    const productOrNull = await this.productService.findProductById(id);
    // if the product is not found, returns response 404
    if (!productOrNull) {
      throw new NotFoundException(`Cannot find product #${id}`);
    } else {
      return productOrNull;
    }
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Put()
  async update(@Body() product: UpdateProductDto): Promise<Product> {
    return await this.productService.updateProduct(product);
  }

  @Delete(':id')
  async deleteProductById(@Param() params): Promise<Product> {
    const { id } = params;
    return await this.productService.removeProductById(id);
  }
}
