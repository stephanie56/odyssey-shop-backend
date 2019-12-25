import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from 'config/database';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { resolve } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const EnvPath = resolve(__dirname, '..', 'environment', '.env');

@Module({
  imports: [
    /** Load and parse .env files from the environments directory */
    ConfigModule.forRoot({
      envFilePath: EnvPath,
      load: [database],
      isGlobal: true,
    }),
    /** Configure TypeOrm asynchronously. */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MysqlConnectionOptions> => configService.get('database'),
      inject: [ConfigService],
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
