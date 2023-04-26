import { Config } from './config';
import { OrderDB } from './db';
import { Paypal } from './paypal';
import { Server } from './server';

const config = new Config();
const orderDB = new OrderDB();
const paypal = new Paypal(config, orderDB);
const server = new Server(config, paypal);

server.bootstarp();
