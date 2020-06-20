import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigService } from '@nestjs/config';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    StripeModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<any> =>
        configService.get('stripeConfig'),
      inject: [ConfigService],
    }),
    ProductModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
