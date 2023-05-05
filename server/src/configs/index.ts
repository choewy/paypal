export * from './enums';
export * from './types';

import serve from './serve.config';
import paypal from './paypal.config';

export const CONFIG = [serve, paypal];
