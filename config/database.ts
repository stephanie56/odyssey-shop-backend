import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING === 'true',
  sync: process.env.DB_SYNC === 'true',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  port: parseInt(process.env.DB_PORT, 10),
}));
