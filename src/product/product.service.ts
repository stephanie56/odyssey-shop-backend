import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

export interface Product {
  id: string;
  category_id: string; // the type should be an enum: sticker, souvenir, outfit
  title: string;
  image: string;
  description: string;
  // group `product_count`, `price` and `origin` in the `variants`: https://help.shopify.com/en/api/reference/products/product
  price: number;
  product_count: number;
  origin: string; // the type should be an enum with all the kingdoms
}

@Injectable()
export class ProductService {
  private mockProduct = {
    id: '1',
    category_id: 'Souvenir',
    title: 'Mushroom Cushion Set',
    image: 'https://via.placeholder.com/500',
    product_count: 3,
    price: 10.25,
    description:
      'A tablecloth is also included, seriously what else do you need?',
    origin: 'Mushroom Kingdom',
  };

  getMockProduct(id: string): Observable<Product> {
    return of({ ...this.mockProduct, title: `Mushroom Cushion Set #${id}` });
  }

  getAllMockProducts(): Observable<Product[]> {
    return of([this.mockProduct, { ...this.mockProduct, id: '2' }]);
  }
}
