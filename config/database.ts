import { join } from 'path';
import { Product } from 'src/product/product.entity';

// const EntityRecursivePath = join(__dirname, '/**/*.entity{.ts,.js}');

export default () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_LOGGING === 'true',
    sync: process.env.DB_SYNC === 'true',
    entities: [Product],
    port: parseInt(process.env.DB_PORT, 10),
  },
});
