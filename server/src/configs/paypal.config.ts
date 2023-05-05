import { registerAs } from '@nestjs/config';
import { PaypalConfig } from './types';
import { ConfigKey } from './enums';

export default registerAs(
  ConfigKey.PAYPAL,
  (): PaypalConfig => ({
    clientID: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
  }),
);
