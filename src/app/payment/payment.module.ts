import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: 'stripe secret',
      apiVersion: '2020-03-02',
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
