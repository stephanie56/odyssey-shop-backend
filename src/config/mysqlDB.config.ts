import { Product } from 'src/app/product/product.entity';
import { registerAs } from '@nestjs/config';
import { Category } from 'src/app/category/category.entity';

export default registerAs('mysqlDatabase', () => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING === 'true',
  synchronize: process.env.DB_SYNC === 'true',
  entities: [Product, Category],
  port: parseInt(process.env.DB_PORT, 10),
}));
