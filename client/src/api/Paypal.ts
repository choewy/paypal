import axios from 'axios';

export class PaypalAPI {
  private readonly request = axios.create({
    baseURL: 'http://localhost:8000',
  });

  async createOrder(): Promise<{ orderID: string; url: string }> {
    const { data } = await this.request.post('orders');
    return data;
  }

  async captureOrder(orderID: string) {
    const { data } = await this.request.post(`orders/capture`, { orderID });
    return data;
  }
}

export const paypalAPI = new PaypalAPI();
