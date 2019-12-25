import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  /** findProductById take the route parameter (product id) as an input,
   * and returns the Product json as a response.
   */
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
}
