import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

@Injectable()
export class PaymentService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  getStripeClient() {
    return this.stripeClient;
  }

  calculateOrderAmount(cartItems: any): number {
    // return cartItems.reduce((accu, curr) => {
    //   const { product, quantity } = curr;
    //   return
    // }, 0);
    return 1500;
  }
}
