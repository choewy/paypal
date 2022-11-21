export * from '../types';

import server from './server.config';
import google from './google.config';
import typeorm from './typeorm.config';

export const configs = [server, google, typeorm];
