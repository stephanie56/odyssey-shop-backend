import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'config/database';
import { AppService } from './app.service';

@Module({
  imports: [
    /** Load and parse .env files from the environments directory */
    ConfigModule.forRoot({
      envFilePath: 'src/environment/*.env',
      load: [databaseConfig],
      isGlobal: true,
    }),
    /** Configure TypeOrm asynchronously. */
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
