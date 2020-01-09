import { Category } from 'src/app/category/category.entity';

export class CreateProductDto {
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  count: number;
  origin: string;
}
