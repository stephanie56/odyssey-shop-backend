import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mysqlDB from 'src/config/mysqlDB.config';
import { AppService } from './app.service';
import { ProductModule } from './app/product/product.module';
import { resolve } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import Joi = require('@hapi/joi');
import { CategoryModule } from './app/category/category.module';

const EnvPath = resolve(
  __dirname,
  '..',
  'environments',
  `.env.${process.env.NODE_ENV || 'development'}`,
);

@Module({
  imports: [
    /** Load and parse .env files from the environments directory */
    ConfigModule.forRoot({
      envFilePath: EnvPath,
      ignoreEnvFile: process.env.NODE_ENV === 'production', // ignore .env file when it's on production
      load: [mysqlDB],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
    }),
    /** Configure TypeOrm asynchronously. */
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<MysqlConnectionOptions> => configService.get('mysqlDatabase'),
      inject: [ConfigService],
    }),
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
