import { Controller, Body, Post, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('/api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create-payment-intent')
  async createPaymentMethod(
    @Body() createPaymentIntentData: any,
  ): Promise<any> {
    const { items } = createPaymentIntentData;
    const amount = await this.paymentService.calculateOrderAmount(items);
    const res = await this.paymentService
      .getStripeClient()
      .paymentIntents.create({
        amount,
        currency: 'cad',
        payment_method_types: ['card'],
      })
      .then(paymentIntent => {
        return {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        };
      })
      .catch(err => {
        return {
          error: {
            code: err.code,
            message: err.message,
          },
        };
      });

    return res;
  }
}
