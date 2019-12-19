import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class CustomProductRepository extends Repository<Product> {}
