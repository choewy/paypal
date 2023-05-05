import { registerAs } from '@nestjs/config';
import { ConfigKey } from './enums';
import { ServeConfig } from './types';

export default registerAs(
  ConfigKey.SERVE,
  (): ServeConfig => ({ port: parseInt(process.env.PORT) }),
);
