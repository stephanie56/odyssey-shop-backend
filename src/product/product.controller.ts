import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductService, Product } from './product.service';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Observable<Product[]> {
    return this.productService.getAllMockProducts();
  }

  /** findProductById take the route parameter (product id) as an input,
   * and returns the Product json as a response.
   */
  @Get(':id')
  findProductById(@Param() params): Observable<Product> {
    const { id } = params;
    // if the product is not found, returns response 404
    // ref: https://docs.nestjs.com/exception-filters
    // if (true) {
    //   throw new NotFoundException(`Cannot find product #${id}`);
    // }

    // use param.id to find the product from database
    return this.productService.getMockProduct(id);
  }
}
