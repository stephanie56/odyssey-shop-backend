import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../product/product.repository';
import { ProductService } from '../product/product.service';

interface CartItem {
  productId: string;
  quantity: number;
}

@Injectable()
export class PaymentService {
  public constructor(
    @InjectStripe()
    private readonly stripeClient: Stripe,
    private productService: ProductService,
  ) {}

  getStripeClient() {
    return this.stripeClient;
  }

  async calculateOrderAmount(cartItems: CartItem[]): Promise<number> {
    return cartItems.reduce(async (accu, curr) => {
      const { productId, quantity } = curr;
      const productPrice = await this.productService.findProductPriceById(
        productId,
      );
      const accumulator = await accu;
      return Promise.resolve(productPrice * quantity * 100 + accumulator);
    }, Promise.resolve(0));
  }
}
