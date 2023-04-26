import axios, { Axios, AxiosHeaders } from 'axios';
import { v4 } from 'uuid';
import { Config } from './config';
import { PaymentOrderRto } from './rtos';
import { OrderDB } from './db';

export class Paypal {
  private readonly axios: Axios;
  private readonly basicAuth: string;

  constructor(private readonly config: Config, private readonly orderDB: OrderDB) {
    const auth = [this.config.PAYPAL.clientID, this.config.PAYPAL.clientSecret].join(':');

    this.basicAuth = Buffer.from(auth).toString('base64');
    this.axios = axios.create();
  }

  private async getAccessToken(): Promise<string> {
    const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';

    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', `Basic ${this.basicAuth}`);

    const { data } = await this.axios.post(url, new URLSearchParams({ grant_type: 'client_credentials' }), { headers });

    return data.access_token;
  }

  public async createOrder(): Promise<PaymentOrderRto> {
    const url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';

    const accessToken = await this.getAccessToken();
    const paypalRequestID = v4();
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${accessToken}`);
    headers.set('Paypal-Request-Id', paypalRequestID);

    const body = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          payee: { email_address: 'choewy@receiver.com' },
          amount: {
            currency_code: 'USD',
            value: '10.00',
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: '8.00',
              },
              handling: {
                currency_code: 'USD',
                value: '2.00',
              },
              shipping: {
                currency_code: 'USD',
                value: '0.00',
              },
              tax_total: {
                currency_code: 'USD',
                value: '0.00',
              },
            },
          },
          payment_instruction: {
            platform_fees: [
              {
                payee: { email_address: 'choewy@platform.com' },
                amount: {
                  currency_code: 'USD',
                  value: '2.00',
                },
              },
            ],
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_selected: 'PAYPAL',
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'TEST INC',
            locale: 'en-US',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: 'http://localhost:3000/ok',
            cancel_url: 'http://localhost:3000/cancel',
          },
        },
      },
    };

    const { data } = await this.axios.post(url, body, { headers });

    await this.orderDB.insert(data.id, paypalRequestID);

    return new PaymentOrderRto(data);
  }

  public async captureOrder(orderID: string) {
    const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`;

    const accessToken = await this.getAccessToken();
    const paypalRequestID = await this.orderDB.findByOrderID(orderID);

    if (!paypalRequestID) {
      throw new Error('Not Found Order');
    }

    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${accessToken}`);
    headers.set('Paypal-Request-Id', paypalRequestID);

    const { data } = await this.axios.post(url, {}, { headers });

    return data;
  }
}
