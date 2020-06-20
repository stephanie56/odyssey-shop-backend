import { registerAs } from '@nestjs/config';

export default registerAs('stripeConfig', () => ({
  apiKey: process.env.STRIPE_SECRET_KEY,
  apiVersion: '2020-03-02',
}));
