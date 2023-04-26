import express, { Express, json, urlencoded } from 'express';
import cors from 'cors';
import { Config } from './config';
import { Paypal } from './paypal';

export class Server {
  private readonly app: Express;

  constructor(private readonly config: Config, private readonly paypal: Paypal) {
    this.app = express();
  }

  private errorLog(e: any) {
    const error = e.response.data;
    console.log(error);
    return error;
  }

  private middlewares() {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(cors());
  }

  private routers() {
    this.app.post('/orders', async (_, res) => {
      try {
        const order = await this.paypal.createOrder();
        res.status(201).send(order);
      } catch (e) {
        res.status(400).send(this.errorLog(e));
      }
    });

    this.app.post('/orders/capture', async (req, res) => {
      const body = req.body as { orderID: string };

      try {
        const order = await this.paypal.captureOrder(body.orderID);
        res.status(204).send(order);
      } catch (e) {
        res.status(400).send(this.errorLog(e));
      }
    });
  }

  public bootstarp() {
    this.middlewares();
    this.routers();
    this.app.listen(this.config.PORT);
  }
}
